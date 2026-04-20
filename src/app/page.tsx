import { NexusHero } from "@/components/NexusHero";
import { AboutSection } from "@/components/AboutSection";
import { ServicesShowcase } from "@/components/Services";
import { ContactSection } from "@/components/ContactSection";
import { SplitSection } from "@/components/SplitSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <NexusHero />
      <AboutSection />
      <ServicesShowcase />
      {/* <ContactSection />  */}
      <SplitSection />
      <Footer />
    </main>
  );
}
