import Link from "next/link";
import { Sparkles, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";
import { getAllMetiers } from "@/lib/metiers";

export default function Footer() {
  const metiers = getAllMetiers();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Disclaimer Affiliate Bar */}
      <div className="bg-slate-950/60 border-b border-slate-800 py-3.5 px-4 text-center">
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white">IA Par Métier</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Le 1er comparateur français de logiciels d&apos;intelligence artificielle et d&apos;automatisation taillé sur-mesure pour chaque profession.
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-md border border-emerald-800/60">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Tests réels & avis impartiaux 2026</span>
            </div>
          </div>

          {/* Col 2 & 3: Metiers list */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Comparatifs IA par profession
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {metiers.map((m) => (
                <Link
                  key={m.slug}
                  href={`/metier/${m.slug}`}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group py-1"
                >
                  <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                  <span>{m.metier}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Col 4: Quality Commitment & Links */}
          <div className="space-y-3 text-xs">
            <h3 className="font-semibold text-slate-200 uppercase tracking-wider">
              À propos & Informations
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/#methodologie" className="hover:text-white transition-colors">
                  Notre protocole de test B2B
                </Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                  Plan du site (Sitemap XML)
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Mises à jour quotidiennes des tarifs</span>
              </li>
              <li>
                <span className="text-slate-500">Compatible RGPD & Sécurité B2B</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500">
              Conçu pour maximiser la productivité des indépendants, cabinets et entreprises françaises.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 IA Par Métier — Tous droits réservés.</p>
          <p className="flex items-center gap-4">
            <span>Fait avec passion pour l&apos;automatisation</span>
            <span>•</span>
            <span>Édition France</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
