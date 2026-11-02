"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Metier } from "@/types/metier";
import {
  Search,
  Clock,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  X,
  Layers,
} from "lucide-react";

interface HomeMetiersExplorerProps {
  metiers: Metier[];
  categories: string[];
}

export default function HomeMetiersExplorer({
  metiers,
  categories,
}: HomeMetiersExplorerProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Tous");

  const filteredMetiers = useMemo(() => {
    return metiers.filter((item) => {
      const matchCategory =
        activeCategory === "Tous" || item.categorie_metier === activeCategory;

      const q = search.toLowerCase().trim();
      if (!q) return matchCategory;

      const matchSearch =
        item.metier.toLowerCase().includes(q) ||
        item.categorie_metier.toLowerCase().includes(q) ||
        item.intro_accroche.toLowerCase().includes(q) ||
        item.outils.some((o) => o.nom.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    });
  }, [metiers, search, activeCategory]);

  return (
    <section id="metiers" className="py-10 sm:py-14">
      {/* Search Bar & Category Controls */}
      <div className="max-w-4xl mx-auto mb-10 space-y-4">
        {/* Search Input Box */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par métier ou outil (ex: Avocat, E-commerce, Jasper, Dev, Facturation...)"
            className="w-full pl-12 pr-10 py-3.5 sm:py-4 text-sm sm:text-base bg-white border border-slate-200 hover:border-slate-300 rounded-xl shadow-xs focus:outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-100 transition-all text-slate-900 placeholder:text-slate-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-700 transition-colors"
              title="Effacer la recherche"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 shrink-0 pl-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Secteur :
          </span>
          <button
            onClick={() => setActiveCategory("Tous")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              activeCategory === "Tous"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            Tous ({metiers.length})
          </button>
          {categories.map((cat) => {
            const count = metiers.filter((m) => m.categorie_metier === cat).length;
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs sm:text-sm font-medium text-slate-500">
          <span className="font-bold text-slate-900">{filteredMetiers.length}</span>{" "}
          comparatif{filteredMetiers.length > 1 ? "s" : ""} disponible{filteredMetiers.length > 1 ? "s" : ""}
        </p>
        {(search || activeCategory !== "Tous") && (
          <button
            onClick={() => {
              setSearch("");
              setActiveCategory("Tous");
            }}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold underline cursor-pointer"
          >
            Réinitialiser
          </button>
        )}
      </div>

      {/* Grid of Metiers Cards */}
      {filteredMetiers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMetiers.map((item) => (
            <Link
              key={item.slug}
              href={`/metier/${item.slug}`}
              className="card-hover-effect group flex flex-col bg-white border border-slate-200 rounded-2xl p-6 shadow-xs"
            >
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60">
                  <Layers className="w-3 h-3 text-slate-400" />
                  {item.categorie_metier}
                </span>

                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-md">
                  {item.outils.length} logiciels audités
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 tracking-tight">
                {item.metier}
              </h3>

              {/* Time saved highlight pill */}
              <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50/80 border border-emerald-200/60 text-emerald-800 text-xs font-semibold w-fit">
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Gain moyen : <strong>{item.temps_gagne_hebdo}</strong></span>
              </div>

              {/* Intro excerpt */}
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-5">
                {item.intro_accroche}
              </p>

              {/* Mini Tools list */}
              <div className="mt-auto pt-4 border-t border-slate-100">
                <span className="block text-[11px] font-medium text-slate-400 mb-2">
                  Sélection retenue :
                </span>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.outils.map((o) => (
                    <span
                      key={o.nom}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-50 border border-slate-200/60 text-slate-700 group-hover:border-slate-300 transition-colors"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {o.nom}
                    </span>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div className="w-full py-2.5 px-3.5 rounded-xl bg-slate-50 group-hover:bg-slate-900 border border-slate-200 group-hover:border-slate-900 text-slate-700 group-hover:text-white text-xs font-semibold flex items-center justify-between transition-colors shadow-2xs">
                  <span>Consulter le comparatif</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
            <Search className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">
            Aucun résultat pour &quot;{search}&quot;
          </h4>
          <p className="text-xs text-slate-500 mb-4">
            Essayez un autre mot-clé ou réinitialisez les filtres pour consulter les 12 comparatifs.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setActiveCategory("Tous");
            }}
            className="px-3.5 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            Afficher tous les métiers
          </button>
        </div>
      )}
    </section>
  );
}
