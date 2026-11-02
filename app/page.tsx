import { getAllMetiers, getAllCategories } from "@/lib/metiers";
import HomeMetiersExplorer from "@/components/HomeMetiersExplorer";
import {
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sliders,
  Scale,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const metiers = getAllMetiers();
  const categories = getAllCategories();

  return (
    <div className="relative">
      {/* Precision Grid Background in Hero Area */}
      <div className="absolute top-0 inset-x-0 h-[480px] bg-grid-subtle [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16">
        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-5 animate-fade-in">
          {/* Top Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>Comparateur B2B Indépendant • Édition 2026</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Les meilleurs logiciels d&apos;automatisation pour{" "}
            <span className="text-blue-600 underline decoration-slate-200 underline-offset-8">
              votre métier
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Gagnez jusqu&apos;à 12 heures par semaine sur vos tâches répétitives.
            Nous auditons, testons et comparons les solutions d&apos;intelligence artificielle réellement adaptées aux réalités des entreprises françaises.
          </p>

          {/* Key Stats Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-slate-600">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span><strong>11h / sem.</strong> économisées en moyenne</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-slate-700" />
              <span><strong>100%</strong> indépendant & sans parti pris</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span><strong>48</strong> logiciels testés</span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE METIERS EXPLORER */}
        <HomeMetiersExplorer metiers={metiers} categories={categories} />

        {/* SECTION: MÉTHODOLOGIE & POURQUOI NOS COMPARATIFS */}
        <section id="methodologie" className="my-16 lg:my-24 pt-12 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3">
              <Scale className="w-3.5 h-3.5 text-slate-600" />
              Protocole d&apos;évaluation
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Une grille d&apos;audit stricte, orientée rentabilité
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Nous écartons les gadgets sans valeur ajoutée pour ne sélectionner que les outils produisant un impact direct sur votre marge et votre productivité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="card-hover-effect bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Temps Réellement Économisé
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Chaque logiciel est évalué sur un goulot d&apos;étranglement précis : rédaction contractuelle, devis, fiches produits ou relances de factures.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>Mesuré chronomètre en main</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card-hover-effect bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Rentabilité & ROI Vérifié
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                L&apos;abonnement doit être compensé dès la première semaine par le temps facturable récupéré ou par l&apos;évitement de prestations externes.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>Rentabilité constatée sous 15 jours</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card-hover-effect bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-slate-800" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Conformité & Confidentialité
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Nous vérifions les clauses de non-réutilisation des données professionnelles pour l&apos;entraînement public et le respect du RGPD européen.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>Adapté aux exigences juridiques françaises</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: GUIDE EN 3 ÉTAPES */}
        <section className="my-16 lg:my-20 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
              Démarche recommandée
            </span>
            <h2 className="text-xl sm:text-2xl font-black mt-2 mb-3 tracking-tight">
              Comment déployer sans perturber vos équipes ?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
              Adoptez la méthode progressive utilisée par les cabinets et entreprises qui tirent le meilleur parti des automatisations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-xs">
                  1
                </div>
                <h4 className="font-bold text-sm text-white">Identifier la tâche</h4>
                <p className="text-xs text-slate-400">
                  Isolez la tâche manuelle la plus chronophage de votre semaine.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-xs">
                  2
                </div>
                <h4 className="font-bold text-sm text-white">Tester sur 1 dossier</h4>
                <p className="text-xs text-slate-400">
                  Exploitez les essais gratuits sans carte bancaire sur des cas concrets.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-xs">
                  3
                </div>
                <h4 className="font-bold text-sm text-white">Valider le gain</h4>
                <p className="text-xs text-slate-400">
                  Mesurez le temps récupéré avant d&apos;étendre à toute l&apos;équipe.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4">
              <Link
                href="#metiers"
                className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Accéder aux 12 comparatifs</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-700" />
              </Link>
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                Des milliers de professionnels consultent nos fiches chaque mois
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
