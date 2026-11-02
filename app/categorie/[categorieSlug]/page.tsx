import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  getAllCategoryHubs,
  getCategoryHubBySlug,
  getMetiersByCategorySlug,
} from "@/lib/metiers";
import {
  ChevronRight,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FolderTree,
} from "lucide-react";

interface PageProps {
  params: Promise<{ categorieSlug: string }>;
}

export function generateStaticParams() {
  const hubs = getAllCategoryHubs();
  return hubs.map((h) => ({
    categorieSlug: h.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorieSlug } = await params;
  const hub = getCategoryHubBySlug(categorieSlug);

  if (!hub) {
    return {
      title: "Catégorie introuvable",
    };
  }

  const canonicalUrl = `https://ia-par-metier.vercel.app/categorie/${categorieSlug}`;

  return {
    title: `Les Meilleurs Outils IA pour le secteur ${hub.nom} en 2026`,
    description: `Comparatif 2026 des logiciels d'intelligence artificielle et d'automatisation pour les professionnels du secteur ${hub.nom}. Guides indépendants et gains de temps.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Outils IA pour le secteur ${hub.nom} (Comparatif 2026)`,
      description: hub.description,
      url: canonicalUrl,
      type: "website",
      locale: "fr_FR",
    },
  };
}

export default async function CategoryHubPage({ params }: PageProps) {
  const { categorieSlug } = await params;
  const hub = getCategoryHubBySlug(categorieSlug);

  if (!hub) {
    notFound();
  }

  const metiers = getMetiersByCategorySlug(categorieSlug);
  const otherHubs = getAllCategoryHubs().filter((h) => h.slug !== categorieSlug);

  // Total tools tested in this sector
  const totalTools = metiers.reduce((acc, m) => acc + m.outils.length, 0);

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://ia-par-metier.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Plan du site",
        item: "https://ia-par-metier.vercel.app/plan-du-site",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: hub.nom,
        item: `https://ia-par-metier.vercel.app/categorie/${categorieSlug}`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Comparatifs IA pour le secteur ${hub.nom}`,
    description: hub.description,
    itemListElement: metiers.map((m, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: m.metier,
      url: `https://ia-par-metier.vercel.app/metier/${m.slug}`,
    })),
  };

  return (
    <div className="py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BREADCRUMB */}
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/plan-du-site" className="hover:text-slate-900 transition-colors">
            Secteurs
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900 truncate">
            {hub.nom}
          </span>
        </nav>

        {/* HERO HEADER */}
        <header className="mb-12 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-900 text-white">
              <FolderTree className="w-3.5 h-3.5" />
              Secteur d&apos;activité
            </span>

            <div className="inline-flex items-center gap-1 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-md font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{metiers.length} professions répertoriées</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Les Meilleurs Outils IA pour le secteur{" "}
            <span className="text-blue-600">{hub.nom}</span> en 2026
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            {hub.description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-xl">
            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
              <span className="text-[11px] text-slate-400 uppercase font-bold block">
                Professions auditées
              </span>
              <span className="text-lg font-black text-slate-900">
                {metiers.length} métiers
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
              <span className="text-[11px] text-slate-400 uppercase font-bold block">
                Logiciels testés
              </span>
              <span className="text-lg font-black text-blue-600">
                {totalTools} outils
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
              <span className="text-[11px] text-slate-400 uppercase font-bold block">
                Gain moyen constaté
              </span>
              <span className="text-lg font-black text-emerald-600">
                ~10h / sem.
              </span>
            </div>
          </div>
        </header>

        {/* METIERS GRID */}
        <section className="my-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Tous les comparatifs du secteur {hub.nom}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Sélectionnez votre profession exacte pour accéder au classement détaillé des outils et au simulateur de rentabilité.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metiers.map((item) => (
              <Link
                key={item.slug}
                href={`/metier/${item.slug}`}
                className="card-hover-effect group flex flex-col bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-md">
                    {item.outils.length} logiciels audités
                  </span>
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    <span>{item.temps_gagne_hebdo}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 tracking-tight">
                  {item.metier}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-5">
                  {item.intro_accroche}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100">
                  <span className="block text-[11px] font-medium text-slate-400 mb-2">
                    Top outils sélectionnés :
                  </span>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.outils.map((o) => (
                      <span
                        key={o.nom}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-50 border border-slate-200/60 text-slate-700"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {o.nom}
                      </span>
                    ))}
                  </div>

                  <div className="w-full py-2 px-3 rounded-xl bg-slate-50 group-hover:bg-slate-900 border border-slate-200 group-hover:border-slate-900 text-slate-700 group-hover:text-white text-xs font-semibold flex items-center justify-between transition-colors">
                    <span>Consulter le comparatif</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CROSS-LINKING TO OTHER CATEGORIES */}
        <section className="my-16 pt-12 border-t border-slate-200">
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Explorer les autres secteurs professionnels
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Accédez aux comparatifs d&apos;outils IA dédiés aux autres branches d&apos;activité.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherHubs.map((other) => (
              <Link
                key={other.slug}
                href={`/categorie/${other.slug}`}
                className="card-hover-effect bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:border-slate-400 transition-all flex items-center justify-between group"
              >
                <div>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                    {other.nom}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {other.description}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
