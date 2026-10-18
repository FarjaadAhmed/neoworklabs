import { MetadataRoute } from "next";
import { CONTENT } from "@/config/content";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${CONTENT.site.url}/sitemap.xml`,
    };
}
