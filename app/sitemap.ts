import type { MetadataRoute } from "next";
import { featuredProjects } from "@/lib/data";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://portfolio-ten-livid-ek61h6djfu.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...featuredProjects.map((p) => ({
      url: `${SITE_URL}/projects/${p.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
