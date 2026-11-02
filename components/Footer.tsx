import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { ShieldCheck, HeartHandshake, ArrowRight, FolderTree } from "lucide-react";
import { getAllMetiers, getAllCategoryHubs } from "@/lib/metiers";

export default function Footer() {
  const metiers = getAllMetiers();
  const hubs = getAllCategoryHubs();
  // Select top representative métiers for footer display
  const featuredMetiers = metiers.slice(0, 12);

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Disclaimer Affiliate Bar */}
      <div className="bg-black/50 border-b border-slate-800/80 py-3.5 px-4 text-center">
        <p className="text-xs text-slate-400 max-w-4xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 inline" />
          <span>
            <strong className="text-slate-200">Transparence & Déontologie :</strong> Ce site est financé par ses lecteurs.
            Certains liens de notre comparatif sont des liens affiliés : nous pouvons percevoir une commission si vous
            souscrivez à un service, sans le moindre surcoût pour vous. Nos tests restent 100% indépendants et objectifs.
          </span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand & Presentation */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                <BrandLogo size={18} />
              </div>
              <span className="font-bold text-base text-white">IA Par Métier</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Le comparateur B2B de référence pour identifier les outils d&apos;intelligence artificielle et d&apos;automatisation réellement utiles à votre profession.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-800/50">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>46 professions analysées en 2026</span>
            </div>
          </div>

          {/* Col 2 & 3: Metiers list */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                Exemples de comparatifs métiers
              </h3>
              <Link
                href="/plan-du-site"
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
              >
                <span>Tous les 46 métiers</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {featuredMetiers.map((m) => (
                <Link
                  key={m.slug}
                  href={`/metier/${m.slug}`}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group py-1 truncate"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                  <span className="truncate">{m.metier}</span>
                </Link>
              ))}
            </div>

            {/* Category Hubs Chips */}
            <div className="pt-3 border-t border-slate-800/80">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Hubs par secteur d&apos;activité :
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {hubs.map((h) => (
                  <Link
                    key={h.slug}
                    href={`/categorie/${h.slug}`}
                    className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
                  >
                    {h.nom}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Col 4: Quality Commitment & Links */}
          <div className="space-y-3 text-xs">
            <h3 className="font-semibold text-slate-200 uppercase tracking-wider">
              Navigation & Indexation
            </h3>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <Link
                  href="/plan-du-site"
                  className="text-slate-200 hover:text-blue-400 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <FolderTree className="w-3.5 h-3.5 text-blue-400" />
                  <span>Plan du site (Tous les métiers)</span>
                </Link>
              </li>
              <li>
                <Link href="/#methodologie" className="hover:text-white transition-colors">
                  Critères d&apos;audit & ROI B2B
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                  Sitemap XML (Index Google)
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Mises à jour hebdomadaires 2026</span>
              </li>
              <li>
                <span className="text-slate-500">Conformité RGPD & Données B2B</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500">
              Plateforme 100% statique SSG haute performance pour Googlebot.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 IA Par Métier — Tous droits réservés.</p>
          <p className="flex items-center gap-4">
            <Link href="/plan-du-site" className="hover:text-slate-400">
              Plan du site
            </Link>
            <span>•</span>
            <span>Édition France</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
