import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = path.resolve("public/images");
const RAW_DIR = path.resolve("images-raw");
const MAX_WIDTH = 1920;
const TARGET_MIN = 150 * 1024;
const TARGET_MAX = 400 * 1024;

function slugify(filename) {
  const base = filename.replace(/\.[^.]+$/, "");
  return (
    base
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() + ".webp"
  );
}

async function encodeAtQuality(input, width, quality) {
  return sharp(input)
    .rotate()
    .resize({ width, height: width, fit: "inside", withoutEnlargement: true })
    .webp({ quality, effort: 4 })
    .toBuffer({ resolveWithObject: true });
}

async function optimizeOne(inputPath, outputPath) {
  const meta = await sharp(inputPath).metadata();
  const width = Math.min(MAX_WIDTH, meta.width || MAX_WIDTH);

  let quality = 78;
  let result = await encodeAtQuality(inputPath, width, quality);

  // Tune quality toward 150–400 KB
  for (let i = 0; i < 6; i++) {
    if (result.info.size > TARGET_MAX && quality > 55) {
      quality -= 6;
      result = await encodeAtQuality(inputPath, width, quality);
      continue;
    }
    if (result.info.size < TARGET_MIN && quality < 88) {
      quality += 4;
      result = await encodeAtQuality(inputPath, width, quality);
      continue;
    }
    break;
  }

  // If still huge at low quality, shrink width
  let finalWidth = width;
  while (result.info.size > TARGET_MAX && finalWidth > 1280) {
    finalWidth -= 160;
    result = await encodeAtQuality(inputPath, finalWidth, Math.max(60, quality));
  }

  await fs.writeFile(outputPath, result.data);
  return {
    out: path.basename(outputPath),
    kb: Math.round(result.info.size / 1024),
    width: result.info.width,
    quality,
  };
}

async function main() {
  await fs.mkdir(RAW_DIR, { recursive: true });
  const entries = await fs.readdir(IMAGES_DIR);
  const sources = entries.filter((name) =>
    /\.(jpe?g|png|webp)$/i.test(name),
  );

  if (sources.length === 0) {
    console.log("No source images found.");
    return;
  }

  const mapping = [];

  for (const name of sources) {
    const inputPath = path.join(IMAGES_DIR, name);
    const outName = slugify(name);
    const outputPath = path.join(IMAGES_DIR, outName);
    const rawPath = path.join(RAW_DIR, name);

    // Move original aside first if output would clash after write
    await fs.rename(inputPath, rawPath);

    try {
      const info = await optimizeOne(rawPath, outputPath);
      mapping.push({ original: name, web: outName, ...info });
      console.log(
        `${name} -> ${outName} (${info.kb} KB, ${info.width}px, q${info.quality})`,
      );
    } catch (err) {
      // Restore original on failure
      await fs.rename(rawPath, inputPath);
      console.error(`Failed ${name}:`, err.message);
    }
  }

  await fs.writeFile(
    path.join(IMAGES_DIR, "manifest.json"),
    JSON.stringify(mapping, null, 2),
  );
  console.log(`\nDone. ${mapping.length} images optimized.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
