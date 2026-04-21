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
  title: "Neoworks Lab",
  description: "Neoworks Lab is a data-driven digital marketing agency that helps businesses unlock their full potential through innovative strategies and cutting-edge technology.",
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
