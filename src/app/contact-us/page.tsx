import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { CONTENT } from "@/config/content";
import { pageMetadata } from "@/lib/seo";

const { email, phone } = CONTENT.footer.contact.inquiries;

export const metadata = pageMetadata({
  title: "Contact Us",
  description: `Tell ${CONTENT.site.name} about your project. Email ${email} or call ${phone} to start on video, design, web, or AI ads.`,
  path: "/contact-us",
});

export default function ContactUs() {
    return (
        <>
            <main>
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
