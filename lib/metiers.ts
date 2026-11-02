import { Metier, CategoryHub } from "@/types/metier";
import metiersData from "@/data/metiers.json";

export const CATEGORY_HUBS: CategoryHub[] = [
  {
    slug: "immobilier-btp",
    nom: "Immobilier & BTP",
    description: "Comparatifs d'outils d'intelligence artificielle pour agences immobilières, courtiers, syndics, architectes et artisans du bâtiment. Automatisez vos estimations, comptes-rendus et devis.",
  },
  {
    slug: "sante-liberal",
    nom: "Santé & Libéral",
    description: "Solutions IA et d'automatisation pour professionnels de santé libéraux, cabinets dentaires, kinésithérapeutes, ostéopathes et infirmiers. Gagnez du temps sur vos comptes-rendus et prises de rendez-vous.",
  },
  {
    slug: "droit-finance",
    nom: "Finance, Droit & Conseil",
    description: "Logiciels d'analyse contractuelle, d'extraction comptable et de conseil patrimonial pour avocats, notaires, experts-comptables et consultants.",
  },
  {
    slug: "digital-marketing",
    nom: "Digital, Création & Tech",
    description: "Les meilleurs outils IA pour agences marketing, développeurs, e-commerçants, créateurs vidéo, copywriters et community managers.",
  },
  {
    slug: "formation-coaching",
    nom: "Formation, RH & Coaching",
    description: "Automatisez vos modules de cours Qualiopi, vos synthèses de coaching et le tri de candidatures pour recruteurs, DRH et formateurs en ligne.",
  },
  {
    slug: "commerce-services",
    nom: "Commerce, Tourisme & Services",
    description: "Optimisez vos réservations, avis Google Maps et conciergerie pour restaurateurs, gérants de conciergeries Airbnb, agences de voyage et commerces.",
  },
];

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

export function getAllCategoryHubs(): CategoryHub[] {
  return CATEGORY_HUBS;
}

export function getCategoryHubBySlug(slug: string): CategoryHub | undefined {
  return CATEGORY_HUBS.find((c) => c.slug === slug);
}

export function getMetiersByCategorySlug(categorySlug: string): Metier[] {
  const metiers = getAllMetiers();
  return metiers.filter((m) => m.categorie_slug === categorySlug);
}

export function getRelatedMetiers(currentSlug: string, limit = 6): Metier[] {
  const metiers = getAllMetiers();
  const current = metiers.find((m) => m.slug === currentSlug);
  if (!current) return metiers.slice(0, limit);

  // Prioritize same category, then other métiers
  const sameCategory = metiers.filter(
    (m) => m.slug !== currentSlug && m.categorie_metier === current.categorie_metier
  );
  const otherCategories = metiers.filter(
    (m) => m.slug !== currentSlug && m.categorie_metier !== current.categorie_metier
  );

  return [...sameCategory, ...otherCategories].slice(0, limit);
}
