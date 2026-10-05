import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import PhotoGallery from "@/components/PhotoGallery";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10">
        <Intro />
        <PhotoGallery />
      </div>
    </>
  );
}
