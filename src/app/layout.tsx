import type { Metadata } from "next";
import { Poppins, Anton, Bebas_Neue, Geist } from "next/font/google";
import "./globals.css";


import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { CONTENT } from "@/config/content";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

const bebas_neue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

const { site, footer } = CONTENT;

// Canonical URLs are set per page; a canonical here would be inherited by every route.
export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  keywords: ["Video Editing Agency", "Graphic Design", "Character Design", "Web Development", "AI Generated Ads", "Creative Agency", site.name],
  authors: [{ name: site.name }],
  openGraph: {
    title: site.title,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/neo.jpg`,
  description: site.description,
  email: footer.contact.inquiries.email,
  telephone: footer.contact.inquiries.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: footer.contact.address[0],
    addressLocality: "Canberra",
    postalCode: "2912",
    addressCountry: "AU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "relative", "antialiased", poppins.variable, anton.variable, bebas_neue.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full relative flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        <Navbar />
        {/* <CustomCursor />   */}
        {children}
      </body>
    </html>
  );
}
