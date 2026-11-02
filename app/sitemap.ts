import { MetadataRoute } from "next";
import { getAllMetiers, getAllCategoryHubs } from "@/lib/metiers";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ia-par-metier.vercel.app";
  const metiers = getAllMetiers();
  const hubs = getAllCategoryHubs();
  const currentDate = new Date();

  // Category Hubs URLs
  const hubRoutes = hubs.map((h) => ({
    url: `${baseUrl}/categorie/${h.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Metiers URLs
  const metierRoutes = metiers.map((m) => ({
    url: `${baseUrl}/metier/${m.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/plan-du-site`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...hubRoutes,
    ...metierRoutes,
  ];
}
