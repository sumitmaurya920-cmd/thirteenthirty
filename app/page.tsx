import FirstSection from "@/components/layout/HomePage/FirstSection";
import SecondSection from "@/components/layout/HomePage/SecondSection";
import SliderSection from "@/components/layout/HomePage/SliderSection";
import Experience from "@/components/layout/HomePage/Experience";
import Contact from "@/components/layout/HomePage/Contact";
import VideoHero from "@/components/layout/HomePage/VideoHero";
import ChairGallery from "@/components/layout/HomePage/ChairGallery";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", color: "#fff", marginTop: "0px" }}>
      <SliderSection />
      {/* <FirstSection />       */}
      <SecondSection />
      <VideoHero />
      <ChairGallery />
      <Experience />
      <Contact />
    </main>
  );
}
