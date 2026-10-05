import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import PhotoGallery from "@/components/PhotoGallery";
import VideoSection from "@/components/VideoSection";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10">
        <Intro />
        <PhotoGallery />
        <VideoSection />
      </div>
    </>
  );
}
