import { AboutSection } from "@/components/AboutSection";
import { SplitSection } from "@/components/SplitSection";
import { WaveHero } from "@/components/WaveHero";
import { WebGLShader } from "@/components/web-gl-shader";
import { ServicesIndex } from "@/components/ServicesIndex";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <WaveHero />
      <div
        className="relative z-20 w-full"
        style={{
          backgroundColor: "var(--background)",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(97, 194, 70, 0.18), transparent 45%), radial-gradient(circle at 80% 80%, rgba(77, 149, 255, 0.14), transparent 45%)",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(7,19,37,0.4)_100%)]"
          style={{ backgroundAttachment: "fixed" }}
        />
        <div
          className="absolute inset-0 z-0 opacity-30 pointer-events-none"
          style={{ clipPath: "inset(0)" }}
        >
          <div className="fixed inset-0 h-screen w-full">
            <WebGLShader />
          </div>
        </div>
        <div className="relative z-60 w-full">
          <div id="about" className="scroll-mt-24">
            <AboutSection />
          </div>
          <div id="services" className="scroll-mt-24">
            <ServicesIndex />
          </div>
          <div id="testimonials" className="scroll-mt-24">
            <Testimonials />
          </div>
          <SplitSection />
          <Footer />
        </div>
      </div>
    </main>
  );
}
