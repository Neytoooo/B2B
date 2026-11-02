"use client";

import { useState } from "react";
import { Calculator, Clock, Sparkles, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";

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
    <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-violet-950 text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-indigo-500/20 my-12 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 mb-2">
            <Calculator className="w-3.5 h-3.5 text-indigo-400" />
            <span>Simulateur de Rentabilité Financière</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Combien d&apos;euros allez-vous économiser chaque mois ?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Basé sur le gain moyen constaté de <strong>{tempsGagneHebdo}</strong> pour le métier : {metierNom}.
          </p>
        </div>

        <div className="shrink-0 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2.5 rounded-2xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-emerald-300 font-semibold">
              ROI Estimé
            </div>
            <div className="text-xl font-extrabold text-emerald-400">
              x{roiMultiplier}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Slider & Inputs (Left: 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="hourly-rate-slider" className="text-sm font-semibold text-slate-200">
                Votre taux horaire moyen (ou coût horaire chargé) :
              </label>
              <span className="text-lg font-black text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-lg border border-indigo-800/80">
                {hourlyRate} € / heure
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
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
            />

            <div className="flex justify-between text-[11px] text-slate-400 mt-1.5 font-medium">
              <span>20 €/h (Débutant / TPE)</span>
              <span>50 €/h (Moyenne B2B)</span>
              <span>100 €/h+ (Consultant / Expert)</span>
              <span>200 €/h</span>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Heures sauvées / mois</span>
              </div>
              <div className="text-lg font-bold text-white">
                ~{monthlyHours} heures
              </div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Coût logiciel moyen</span>
              </div>
              <div className="text-lg font-bold text-slate-300">
                ~{estimatedToolCost} € / mois
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 bg-slate-800/60 border border-slate-700/80 rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Gain annuel net</span>
              </div>
              <div className="text-lg font-bold text-emerald-400">
                +{annualGain.toLocaleString("fr-FR")} €
              </div>
            </div>
          </div>
        </div>

        {/* Big ROI Result Box (Right: 5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-indigo-600/30 to-violet-600/20 border border-indigo-400/30 rounded-2xl p-6 text-center backdrop-blur-sm shadow-inner">
          <span className="text-xs uppercase tracking-wider text-indigo-300 font-bold block mb-1">
            Bénéfice Net Constaté
          </span>
          <div className="text-4xl sm:text-5xl font-black text-white tracking-tight my-2">
            +{netMonthlyGain.toLocaleString("fr-FR")} €
            <span className="text-sm sm:text-base font-normal text-slate-300 ml-1">
              / mois
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-5 max-w-xs mx-auto">
            Soit l&apos;équivalent de <strong>{monthlyHours} heures de travail facturables</strong> réinvesties dans le développement de votre activité.
          </p>

          <a
            href={topToolUrl}
            target="_blank"
            rel="sponsored noopener"
            className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all group"
          >
            <span>Tester {topToolName} (Choix #1)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <span className="block text-[11px] text-slate-400 mt-2 font-medium">
            Essai gratuit sans engagement • Annulation en 1 clic
          </span>
        </div>
      </div>
    </div>
  );
}
