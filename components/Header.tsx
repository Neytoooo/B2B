import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { Calendar, Layers, ArrowUpRight } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs group-hover:bg-slate-800 transition-colors">
            <BrandLogo size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              IA Par Métier
            </span>
            <span className="text-[10px] text-slate-500 -mt-1 font-medium tracking-wide">
              L&apos;Observatoire B2B Indépendant
            </span>
          </div>
        </Link>

        {/* Center Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#metiers"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            12 Métiers Répertoriés
          </Link>
          <Link
            href="/#methodologie"
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Critères & Rentabilité
          </Link>
        </nav>

        {/* Right Badges & CTA */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <Calendar className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            <span>Édition 2026</span>
          </div>

          <Link
            href="/#metiers"
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs hover:shadow transition-all"
          >
            <span>Explorer</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>
    </header>
  );
}
