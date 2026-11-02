import Link from "next/link";
import { Metadata } from "next";
import {
  getAllCategoryHubs,
  getMetiersByCategorySlug,
  getAllMetiers,
} from "@/lib/metiers";
import {
  FolderTree,
  ChevronRight,
  ArrowRight,
  Layers,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Plan du Site HTML | Tous les Comparatifs IA par Métier (2026)",
  description:
    "Index complet de tous les comparatifs d'outils d'intelligence artificielle classés par secteur d'activité et profession. 46 métiers répertoriés pour accélérer votre indexation.",
  alternates: {
    canonical: "https://ia-par-metier.vercel.app/plan-du-site",
  },
};

export default function PlanDuSitePage() {
  const hubs = getAllCategoryHubs();
  const allMetiers = getAllMetiers();

  return (
    <div className="py-8 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BREADCRUMB */}
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">Plan du site</span>
        </nav>

        {/* HERO TITLE */}
        <div className="mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-900 text-white">
            <FolderTree className="w-3.5 h-3.5" />
            <span>Index Exhaustif</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Plan du site : Les 46 guides IA par profession
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Consultez l&apos;ensemble de nos analyses d&apos;outils d&apos;intelligence artificielle et de nos calculateurs de rentabilité, organisés par grands secteurs économiques.
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-slate-700">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>{allMetiers.length} métiers comparés</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>6 hubs sectoriels</span>
            </div>
          </div>
        </div>

        {/* SECTORS AND METIERS LIST */}
        <div className="space-y-12">
          {hubs.map((hub) => {
            const metiersInHub = getMetiersByCategorySlug(hub.slug);

            return (
              <section
                key={hub.slug}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs"
              >
                {/* Hub Header with Link */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                        {hub.nom}
                      </h2>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {metiersInHub.length} professions
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                      {hub.description}
                    </p>
                  </div>

                  <Link
                    href={`/categorie/${hub.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-blue-600 transition-colors w-fit shrink-0"
                  >
                    <span>Voir le hub {hub.nom}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* List of Metiers */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-6">
                  {metiersInHub.map((m) => (
                    <Link
                      key={m.slug}
                      href={`/metier/${m.slug}`}
                      className="group p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/70 transition-all flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-semibold text-xs sm:text-sm text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                          {m.metier}
                        </span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* GENERAL PAGES LIST */}
        <section className="mt-14 pt-8 border-t border-slate-200">
          <h3 className="font-bold text-base text-slate-900 mb-4">
            Pages institutionnelles & Guides
          </h3>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
            <Link href="/" className="hover:text-blue-600 underline">
              Accueil du comparateur
            </Link>
            <span>•</span>
            <Link href="/#methodologie" className="hover:text-blue-600 underline">
              Protocole d&apos;évaluation B2B
            </Link>
            <span>•</span>
            <Link href="/sitemap.xml" className="hover:text-blue-600 underline">
              Fichier Sitemap XML direct
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
