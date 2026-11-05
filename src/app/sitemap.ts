import { MetadataRoute } from "next";
import { CONTENT } from "@/config/content";

// Dates are hand-set in content.ts, not build time: a build-time date tells crawlers
// every page changed on every deploy. Bump a service's `updated` when its copy changes.
export default function sitemap(): MetadataRoute.Sitemap {
    const url = CONTENT.site.url;
    const services = CONTENT.services.items;
    // ISO dates sort lexically, so the max string is the latest date.
    const latest = services.map((s) => s.updated).sort().at(-1);
    return [
        { url, lastModified: latest, changeFrequency: "monthly", priority: 1 },
        { url: `${url}/services`, lastModified: latest, changeFrequency: "monthly", priority: 0.8 },
        ...services.map((s) => ({
            url: `${url}/services/${s.slug}`,
            lastModified: s.updated,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
        { url: `${url}/about`, lastModified: latest, changeFrequency: "yearly", priority: 0.6 },
        { url: `${url}/contact-us`, changeFrequency: "yearly", priority: 0.6 },
    ];
}
