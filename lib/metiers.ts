import { Metier } from "@/types/metier";
import metiersData from "@/data/metiers.json";

export function getAllMetiers(): Metier[] {
  return metiersData as Metier[];
}

export function getMetierBySlug(slug: string): Metier | undefined {
  const metiers = getAllMetiers();
  return metiers.find((m) => m.slug === slug);
}

export function getAllCategories(): string[] {
  const metiers = getAllMetiers();
  const categories = Array.from(new Set(metiers.map((m) => m.categorie_metier)));
  return categories.sort();
}

export function getRelatedMetiers(currentSlug: string, limit = 3): Metier[] {
  const metiers = getAllMetiers();
  const current = metiers.find((m) => m.slug === currentSlug);
  if (!current) return metiers.slice(0, limit);

  // Prioritize same or similar category, then other métiers
  const sameCategory = metiers.filter(
    (m) => m.slug !== currentSlug && m.categorie_metier === current.categorie_metier
  );
  const otherCategories = metiers.filter(
    (m) => m.slug !== currentSlug && m.categorie_metier !== current.categorie_metier
  );

  return [...sameCategory, ...otherCategories].slice(0, limit);
}
