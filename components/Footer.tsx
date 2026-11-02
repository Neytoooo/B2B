import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";
import { getAllMetiers } from "@/lib/metiers";

export default function Footer() {
  const metiers = getAllMetiers();

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
              <span>Analyses de terrain indépendantes</span>
            </div>
          </div>

          {/* Col 2 & 3: Metiers list */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Guides sectoriels 2026
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {metiers.map((m) => (
                <Link
                  key={m.slug}
                  href={`/metier/${m.slug}`}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group py-1"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  <span>{m.metier}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: Quality Commitment & Links */}
          <div className="space-y-3 text-xs">
            <h3 className="font-semibold text-slate-200 uppercase tracking-wider">
              Méthodologie & Accès
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/#methodologie" className="hover:text-white transition-colors">
                  Critères d&apos;audit & ROI
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                  Plan du site (sitemap.xml)
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Mise à jour régulière des tarifs SaaS</span>
              </li>
              <li>
                <span className="text-slate-500">Protection des données & RGPD</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500">
              Édition 2026 — Plateforme technique statique zéro tracking intrusif.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 IA Par Métier — Tous droits réservés.</p>
          <p className="flex items-center gap-4">
            <span>Comparatif B2B Indépendant</span>
            <span>•</span>
            <span>France</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
