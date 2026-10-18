import type { Metadata } from "next";
import { CONTENT } from "@/config/content";

// Next.js replaces (not merges) a parent's openGraph/twitter objects, so every
// page sets the full set here along with its own canonical URL.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${CONTENT.site.name}` : CONTENT.site.title;
  // Served by app/opengraph-image.tsx; child pages lose the file-based image once they set openGraph.
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: CONTENT.site.title };

  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: CONTENT.site.name,
      locale: "en_US",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
