"use client";

import { useState } from "react";
import { FAQItem } from "@/types/metier";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqSectionProps {
  faq: FAQItem[];
  metierNom: string;
}

export default function FaqSection({ faq, metierNom }: FaqSectionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // First item open by default

  const toggle = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section className="my-16 pt-12 border-t border-slate-200">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold mb-3 border border-slate-200">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Foire Aux Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Questions fréquentes pour {metierNom}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Réponses aux interrogations opérationnelles, légales et techniques.
          </p>
        </div>

        <div className="space-y-3">
          {faq.map((item, idx) => {
            const isOpen = openIndexes.includes(idx);
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-slate-200 text-slate-900" : "text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {item.reponse}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
