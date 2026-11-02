"use client";

import { useState } from "react";
import { Calculator, Clock, TrendingUp, CheckCircle2, ArrowRight, CreditCard } from "lucide-react";

interface RoiCalculatorProps {
  tempsGagneHebdo: string;
  metierNom: string;
  topToolName: string;
  topToolUrl: string;
}

export default function RoiCalculator({
  tempsGagneHebdo,
  metierNom,
  topToolName,
  topToolUrl,
}: RoiCalculatorProps) {
  // Extract number of hours from string like "10 heures / semaine"
  const match = tempsGagneHebdo.match(/(\d+)/);
  const weeklyHours = match ? parseInt(match[1], 10) : 10;

  const [hourlyRate, setHourlyRate] = useState<number>(50);

  // Calculations
  const monthlyHours = Math.round(weeklyHours * 4.33);
  const grossMonthlySavings = monthlyHours * hourlyRate;
  const estimatedToolCost = 45; // average monthly cost of SaaS tool
  const netMonthlyGain = Math.max(0, grossMonthlySavings - estimatedToolCost);
  const annualGain = netMonthlyGain * 12;
  const roiMultiplier = Math.round(grossMonthlySavings / estimatedToolCost);

  return (
    <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-800 my-12 relative overflow-hidden">
      {/* Precision grid pattern inside calculator */}
      <div className="absolute inset-0 bg-grid-subtle opacity-20 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800/80 relative z-10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 text-xs font-medium border border-slate-800 mb-2">
            <Calculator className="w-3.5 h-3.5 text-blue-400" />
            <span>Simulateur d&apos;Économie Financière</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Quelle valeur financière allez-vous récupérer chaque mois ?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Basé sur le gain moyen constaté de <strong>{tempsGagneHebdo}</strong> pour : {metierNom}.
          </p>
        </div>

        <div className="shrink-0 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
              Multiplicateur ROI
            </div>
            <div className="text-lg font-black text-emerald-400">
              x{roiMultiplier}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Slider & Inputs (Left: 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2.5">
              <label htmlFor="hourly-rate-slider" className="text-xs sm:text-sm font-semibold text-slate-300">
                Votre coût ou taux horaire moyen facturable :
              </label>
              <span className="text-base sm:text-lg font-black text-white bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                {hourlyRate} € / h
              </span>
            </div>

            <input
              id="hourly-rate-slider"
              type="range"
              min="20"
              max="200"
              step="5"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              aria-label="Taux horaire moyen en euros"
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
            />

            <div className="flex justify-between text-[11px] text-slate-500 mt-1.5 font-medium">
              <span>20 €/h (TPE / Débutant)</span>
              <span>50 €/h (Moyenne B2B)</span>
              <span>100 €/h+ (Consultant / Expert)</span>
              <span>200 €/h</span>
            </div>
          </div>

          {/* Metrics summary */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Heures libérées / mois</span>
              </div>
              <div className="text-base font-bold text-white">
                ~{monthlyHours} h
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                <span>Coût logiciel estimé</span>
              </div>
              <div className="text-base font-bold text-slate-300">
                ~{estimatedToolCost} € / mois
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Gain annuel net</span>
              </div>
              <div className="text-base font-bold text-emerald-400">
                +{annualGain.toLocaleString("fr-FR")} €
              </div>
            </div>
          </div>
        </div>

        {/* Big ROI Box (Right: 5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-1">
            Bénéfice Net Mensuel Estimé
          </span>
          <div className="text-4xl sm:text-5xl font-black text-white tracking-tight my-2">
            +{netMonthlyGain.toLocaleString("fr-FR")} €
            <span className="text-sm font-normal text-slate-400 ml-1">
              / mois
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-5 max-w-xs mx-auto">
            Soit environ <strong>{monthlyHours} heures de travail</strong> réinvesties dans le développement de vos affaires.
          </p>

          <a
            href={topToolUrl}
            target="_blank"
            rel="sponsored noopener"
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:shadow transition-all group cursor-pointer"
          >
            <span>Découvrir {topToolName} (Choix n°1)</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <span className="block text-[11px] text-slate-500 mt-2 font-medium">
            Essai sans engagement • Résiliation en un clic
          </span>
        </div>
      </div>
    </div>
  );
}
