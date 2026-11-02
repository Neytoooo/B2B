import { getAllMetiers, getAllCategories } from "@/lib/metiers";
import HomeMetiersExplorer from "@/components/HomeMetiersExplorer";
import {
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle,
  Award,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const metiers = getAllMetiers();
  const categories = getAllCategories();

  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-100px] left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-200/50 via-violet-200/40 to-pink-100/30 rounded-full blur-3xl opacity-70" />
        <div className="absolute top-[-60px] right-1/4 w-[420px] h-[420px] bg-gradient-to-br from-blue-200/40 via-indigo-100/40 to-teal-100/30 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16">
        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs sm:text-sm font-semibold shadow-xs">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Comparateur B2B Spécialisé • Édition 2026</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Trouvez les meilleurs outils IA pour{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700">
              votre métier
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Ne perdez plus 10 heures par semaine sur des tâches administratives répétitives.
            Découvrez notre sélection indépendante des logiciels d&apos;intelligence artificielle
            les plus rentables et éprouvés sur le terrain pour votre profession.
          </p>

          {/* Key Stats Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-medium text-slate-600">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span><strong>11h / sem.</strong> économisées en moyenne</span>
            </div>
            <div className="hidden sm:inline text-slate-300">•</div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-500" />
              <span><strong>100%</strong> indépendant & testé</span>
            </div>
            <div className="hidden sm:inline text-slate-300">•</div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span><strong>48+</strong> outils audités</span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE METIERS EXPLORER (Search + Filter + Grid) */}
        <HomeMetiersExplorer metiers={metiers} categories={categories} />

        {/* SECTION: POURQUOI NOS COMPARATIFS */}
        <section id="methodologie" className="my-16 lg:my-24 pt-12 border-t border-slate-200/80">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-indigo-600" />
              Exigence & Démarche
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Pourquoi vous fier à nos comparatifs B2B ?
            </h2>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed">
              Le web regorge de listes d&apos;outils IA générées à la chaîne sans aucune vérification.
              Notre approche est différente : nous mesurons l&apos;impact business réel pour chaque métier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Gain de Temps Immédiat
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Chaque outil recommandé élimine un goulot d&apos;étranglement précis : rédaction d&apos;annonces,
                saisie comptable, montage vidéo ou relance de factures.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <CheckCircle className="w-4 h-4" />
                <span>Mesuré chronomètre en main</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-5">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                ROI Supérieur à 10x
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Nous écartons systématiquement les gadgets futiles pour ne retenir que les solutions
                qui se rentabilisent dès le premier contrat ou dès la première semaine d&apos;usage.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <CheckCircle className="w-4 h-4" />
                <span>Rentabilité validée en conditions réelles</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Sécurité & Conformité RGPD
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Nous vérifions la protection des données professionnelles et l&apos;absence de réutilisation
                de vos informations confidentielles pour l&apos;entraînement de modèles publics.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                <CheckCircle className="w-4 h-4" />
                <span>Adapté aux exigences légales françaises</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: 3 ÉTAPES POUR PASSER À L'ACTION */}
        <section className="my-16 lg:my-20 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl">
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider">
              Guide pratique
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-4 tracking-tight">
              Comment intégrer l&apos;IA dans votre quotidien professionnel sans risque ?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-8">
              Pas besoin de révolutionner votre entreprise du jour au lendemain. Adoptez la méthode des petits pas éprouvée par des centaines de cabinets et indépendants.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/80 flex items-center justify-center font-bold text-white text-sm">
                  1
                </div>
                <h4 className="font-bold text-sm text-white">Ciblez une tâche</h4>
                <p className="text-xs text-slate-400">
                  Choisissez la tâche répétitive qui vous coûte le plus d&apos;énergie chaque semaine.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/80 flex items-center justify-center font-bold text-white text-sm">
                  2
                </div>
                <h4 className="font-bold text-sm text-white">Testez 7 jours</h4>
                <p className="text-xs text-slate-400">
                  Utilisez les essais gratuits de nos outils recommandés sur vos vrais dossiers.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/80 flex items-center justify-center font-bold text-white text-sm">
                  3
                </div>
                <h4 className="font-bold text-sm text-white">Automatisez</h4>
                <p className="text-xs text-slate-400">
                  Validez le gain de temps et mesurez votre rentabilité immédiate.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4">
              <Link
                href="#metiers"
                className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Choisir ma profession</span>
                <ArrowRight className="w-4 h-4 text-indigo-600" />
              </Link>
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400" />
                Déjà plus de 25 000 professionnels équipés en 2026
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
