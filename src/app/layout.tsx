import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";


import CustomCursor from "@/components/CustomCursor";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Neoworks Lab | Data-Driven Digital Marketing Agency",
    template: "%s | Neoworks Lab",
  },
  description: "Neoworks Lab is a data-driven digital marketing agency helping businesses scale through innovative AI-enhanced engineering, automation systems, and platform operations.",
  metadataBase: new URL("https://www.neoworkslab.com"),
  alternates: {
    canonical: "/",
  },
  keywords: ["Digital Marketing", "AI Engineering", "Automation Systems", "Agency", "Growth", "Neoworks Lab"],
  authors: [{ name: "Neoworks Lab" }],
  openGraph: {
    title: "Neoworks Lab | Data-Driven Digital Marketing Agency",
    description: "Scale your business with our data-driven strategies and cutting-edge AI technology. Innovative systems built to scale.",
    url: "/",
    siteName: "Neoworks Lab",
    images: [
      {
        url: "/neo.jpg",
        width: 1200,
        height: 630,
        alt: "Neoworks Lab - Data-Driven Digital Marketing Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neoworks Lab | Data-Driven Digital Marketing Agency",
    description: "Scale your business with our data-driven strategies and cutting-edge AI technology.",
    images: ["/neo.jpg"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` ${poppins.variable} h-full relative antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full relative flex flex-col" suppressHydrationWarning>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
