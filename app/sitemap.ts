import { MetadataRoute } from "next";
import { getAllMetiers } from "@/lib/metiers";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://iaparmetier.fr";
  const metiers = getAllMetiers();
  const currentDate = new Date();

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
    ...metierRoutes,
  ];
}
