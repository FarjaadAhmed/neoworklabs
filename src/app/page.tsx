import { NexusHero } from "@/components/NexusHero";
import { AboutSection } from "@/components/AboutSection";
import { FeatureGrid } from "@/components/Services";
import { ContactSection } from "@/components/ContactSection";
import { SplitSection } from "@/components/SplitSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <NexusHero />
      <AboutSection />
      <FeatureGrid />
      <ContactSection />
      <SplitSection />
      <Footer />
    </main>
  );
}
