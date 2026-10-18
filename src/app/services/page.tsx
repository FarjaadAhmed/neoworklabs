import { Footer } from "@/components/Footer";
import ServicesPageComponent from "./Components/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Video editing, graphic and character design, web development, and AI-generated ads from one coordinated creative team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <ServicesPageComponent />
      <Footer />
    </>
  );
}
