import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://www.neoworklabs.com",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://www.neoworklabs.com/services",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: "https://www.neoworklabs.com/contact-us",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.6,
        },
    ];
}
