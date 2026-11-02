"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Metier } from "@/types/metier";
import {
  Search,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Filter,
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
    <section id="metiers" className="py-12 lg:py-16">
      {/* Search Bar & Filters Controls */}
      <div className="max-w-4xl mx-auto mb-10 space-y-5">
        {/* Main Search Input */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Recherchez votre métier (ex: Agent immobilier, Expert-comptable, Dev, E-commerce...)"
            className="w-full pl-12 pr-10 py-4 text-base sm:text-lg bg-white border-2 border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all text-slate-900 placeholder:text-slate-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
              title="Effacer la recherche"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 shrink-0 pl-1">
            <Filter className="w-3.5 h-3.5" /> Catégories :
          </span>
          <button
            onClick={() => setActiveCategory("Tous")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-medium text-slate-500">
          Affichage de <span className="font-bold text-slate-900">{filteredMetiers.length}</span>{" "}
          comparatif{filteredMetiers.length > 1 ? "s" : ""} spécialisé{filteredMetiers.length > 1 ? "s" : ""}
        </p>
        {(search || activeCategory !== "Tous") && (
          <button
            onClick={() => {
              setSearch("");
              setActiveCategory("Tous");
            }}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold underline"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>

      {/* Grid of Metiers */}
      {filteredMetiers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMetiers.map((item) => (
            <Link
              key={item.slug}
              href={`/metier/${item.slug}`}
              className="group relative flex flex-col bg-white border border-slate-200/90 hover:border-indigo-300 rounded-2xl p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                  <Layers className="w-3 h-3 text-slate-500" />
                  {item.categorie_metier}
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  {item.outils.length} outils testés
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 tracking-tight">
                {item.metier}
              </h3>

              {/* Time saved highlight badge */}
              <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold w-fit">
                <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Gain moyen : <strong>{item.temps_gagne_hebdo}</strong></span>
              </div>

              {/* Intro teaser */}
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-5">
                {item.intro_accroche}
              </p>

              {/* Mini Tool Chips */}
              <div className="mt-auto pt-4 border-t border-slate-100">
                <span className="block text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Top outils sélectionnés :
                </span>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.outils.map((o) => (
                    <span
                      key={o.nom}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-700 transition-colors"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      {o.nom}
                    </span>
                  ))}
                </div>

                {/* Bottom CTA Button */}
                <div className="w-full py-2.5 px-4 rounded-xl bg-slate-900 group-hover:bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs">
                  <span>Consulter le comparatif</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900 mb-1">
            Aucun métier trouvé pour &quot;{search}&quot;
          </h4>
          <p className="text-xs text-slate-500 mb-4">
            Essayez un autre mot-clé ou réinitialisez les filtres pour afficher l&apos;ensemble de nos 12 professions analysées.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setActiveCategory("Tous");
            }}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
          >
            Afficher tous les métiers
          </button>
        </div>
      )}
    </section>
  );
}
