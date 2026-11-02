import Link from "next/link";
import { Sparkles, Calendar, Layers } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              IA Par Métier
            </span>
            <span className="text-[10px] text-slate-500 -mt-1 font-medium tracking-wide">
              Le comparateur B2B indépendant
            </span>
          </div>
        </Link>

        {/* Center / Right Items */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/#metiers"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4 text-slate-400" />
            Explorer les 12 Métiers
          </Link>
          <Link
            href="/#methodologie"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
          >
            Méthodologie & ROI
          </Link>
        </div>

        {/* Badge 2026 */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-xs font-semibold text-indigo-700 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <Calendar className="w-3.5 h-3.5 text-indigo-500 hidden sm:inline" />
            <span>Mis à jour en 2026</span>
          </div>

          <Link
            href="/#metiers"
            className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm hover:shadow transition-all"
          >
            Trouver mon IA
          </Link>
        </div>
      </div>
    </header>
  );
}
