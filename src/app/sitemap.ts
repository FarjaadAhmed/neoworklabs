import { MetadataRoute } from "next";
import { CONTENT } from "@/config/content";

// No lastModified: a build-time date tells crawlers every page changed on every deploy.
export default function sitemap(): MetadataRoute.Sitemap {
    const url = CONTENT.site.url;
    return [
        { url, changeFrequency: "monthly", priority: 1 },
        { url: `${url}/services`, changeFrequency: "monthly", priority: 0.8 },
        ...CONTENT.services.items.map((s) => ({
            url: `${url}/services/${s.slug}`,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
        { url: `${url}/contact-us`, changeFrequency: "yearly", priority: 0.6 },
    ];
}
