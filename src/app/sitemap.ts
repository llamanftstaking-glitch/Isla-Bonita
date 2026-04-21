import { MetadataRoute } from "next";

const SITE_URL = "https://islabonita.nyc";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/menu`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/reserve`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/hours`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/events`,        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/catering`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
