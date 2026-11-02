import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  getAllMetiers,
  getMetierBySlug,
  getRelatedMetiers,
} from "@/lib/metiers";
import RoiCalculator from "@/components/RoiCalculator";
import FaqSection from "@/components/FaqSection";
import DynamicDate from "@/components/DynamicDate";
import {
  Clock,
  Star,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Layers,
  ArrowRight,
  FileText,
  Award,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const metiers = getAllMetiers();
  return metiers.map((m) => ({
    slug: m.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const metier = getMetierBySlug(slug);

  if (!metier) {
    return {
      title: "Métier introuvable",
    };
  }

  const canonicalUrl = `https://iaparmetier.fr/metier/${slug}`;

  return {
    title: `${metier.titre_seo}`,
    description: metier.meta_description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metier.titre_seo,
      description: metier.meta_description,
      url: canonicalUrl,
      type: "article",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: metier.titre_seo,
      description: metier.meta_description,
    },
  };
}

export default async function MetierDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const metier = getMetierBySlug(slug);

  if (!metier) {
    notFound();
  }

  const related = getRelatedMetiers(slug, 3);
  const topTool = metier.outils[0];

  // Structured Data Schema.org
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://iaparmetier.fr",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Métiers",
        item: "https://iaparmetier.fr/#metiers",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: metier.metier,
        item: `https://iaparmetier.fr/metier/${slug}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: metier.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.reponse,
      },
    })),
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: metier.titre_seo,
    description: metier.meta_description,
    itemListElement: metier.outils.map((outil, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: outil.nom,
      url: outil.lien_affilie,
      description: outil.description,
    })),
  };

  return (
    <div className="py-8 sm:py-12">
      {/* Schema.org JSON-LD Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BREADCRUMB */}
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/#metiers" className="hover:text-slate-900 transition-colors">
            Métiers
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900 truncate">
            {metier.metier}
          </span>
        </nav>

        {/* HERO HEADER */}
        <header className="mb-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              {metier.categorie_metier}
            </span>

            <div className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Mis à jour en <DynamicDate /></span>
            </div>

            <div className="inline-flex items-center gap-1 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-md font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Audit Indépendant</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {metier.titre_seo}
          </h1>

          {/* Time Saved Highlight Callout Box */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                  Gain moyen constaté
                </span>
                <span className="text-base sm:text-lg font-extrabold text-slate-900">
                  {metier.temps_gagne_hebdo}
                </span>
                <span className="text-xs text-slate-500 ml-1.5">
                  sur vos opérations chronophages
                </span>
              </div>
            </div>

            <a
              href="#comparatif"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-2xs"
            >
              <span>Voir le tableau comparatif</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Intro Context Paragraph */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>{metier.intro_accroche}</p>
          </div>
        </header>

        {/* 1. TABLEAU COMPARATIF RÉCAPITULATIF (ABOVE THE FOLD) */}
        <section id="comparatif" className="my-10">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Tableau Comparatif : Les Meilleurs Outils pour {metier.metier}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Synthèse comparative pour sélectionner rapidement la solution adaptée à votre activité.
            </p>
          </div>

          {/* Responsive Table Container */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                    <th className="py-3.5 px-4 sm:px-6">Rang & Outil</th>
                    <th className="py-3.5 px-4">Spécialité</th>
                    <th className="py-3.5 px-4 text-center">Évaluation</th>
                    <th className="py-3.5 px-4">Tarif constaté</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Lien direct</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {metier.outils.map((o, idx) => (
                    <tr
                      key={o.nom}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        idx === 0 ? "bg-blue-50/20" : ""
                      }`}
                    >
                      {/* Name & Badge */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                              idx === 0
                                ? "bg-slate-900 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            #{idx + 1}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{o.nom}</span>
                            </div>
                            <span className="inline-block text-[11px] font-medium text-slate-500">
                              {o.badge}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Use Case */}
                      <td className="py-4 px-4 text-xs text-slate-600 max-w-xs">
                        <span className="line-clamp-2">{o.categorie}</span>
                      </td>

                      {/* Rating */}
                      <td className="py-4 px-4 text-center">
                        <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md text-xs font-bold text-amber-800">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{o.note.toFixed(1)}/5</span>
                        </div>
                      </td>

                      {/* Pricing */}
                      <td className="py-4 px-4 text-xs font-medium text-slate-700 whitespace-nowrap">
                        {o.prix}
                      </td>

                      {/* Direct CTA */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <a
                          href={o.lien_affilie}
                          target="_blank"
                          rel="sponsored noopener"
                          className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                            idx === 0
                              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-2xs"
                              : "bg-slate-900 hover:bg-slate-800 text-white"
                          }`}
                        >
                          <span>Visiter</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 2. SIMULATEUR DE RENTABILITÉ FINANCIÈRE */}
        <RoiCalculator
          tempsGagneHebdo={metier.temps_gagne_hebdo}
          metierNom={metier.metier}
          topToolName={topTool.nom}
          topToolUrl={topTool.lien_affilie}
        />

        {/* 3. FICHES DÉTAILLÉES DE CHAQUE OUTIL */}
        <section className="my-14 space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Fiches techniques & Retours d&apos;expérience pour {metier.metier}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Détail des fonctionnalités, cas d&apos;usage en conditions réelles et points de vigilance.
            </p>
          </div>

          <div className="space-y-8">
            {metier.outils.map((outil, index) => {
              const isFirst = index === 0;

              return (
                <article
                  key={outil.nom}
                  id={`outil-${index + 1}`}
                  className={`card-hover-effect bg-white rounded-2xl border transition-all duration-200 p-6 sm:p-8 relative ${
                    isFirst
                      ? "border-slate-300 ring-1 ring-slate-200 shadow-sm"
                      : "border-slate-200 shadow-2xs"
                  }`}
                >
                  {/* Top Badge Ranking */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold ${
                          isFirst
                            ? "bg-slate-900 text-white"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {isFirst && <Award className="w-3.5 h-3.5 text-amber-400" />}
                        Recommandation #{index + 1}
                      </span>

                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200/80">
                        {outil.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md text-xs font-bold text-amber-800">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{outil.note.toFixed(1)} / 5</span>
                      </div>
                      <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                        (Évaluation indépendante)
                      </span>
                    </div>
                  </div>

                  {/* Tool Name & Category */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                      {outil.nom}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                      Catégorie : {outil.categorie}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-700 leading-relaxed mb-6">
                    {outil.description}
                  </p>

                  {/* CONCRETE REAL LIFE USE CASE CALLOUT (Linear / Executive Memo Style) */}
                  <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border-l-4 border-blue-600 border border-slate-200 mb-6">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider mb-1.5">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Exemple d&apos;application concrète pour {metier.metier} :</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {outil.cas_usage_metier}
                    </p>
                  </div>

                  {/* PROS & CONS GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {/* Avantages */}
                    <div className="bg-emerald-50/50 border border-emerald-200/60 rounded-xl p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5 mb-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Bénéfices constatés
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {outil.avantages.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold leading-none">✓</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Inconvénients */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 mb-2.5">
                        <XCircle className="w-4 h-4 text-slate-500" />
                        Point d&apos;attention
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {outil.inconvenients.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-slate-400 font-bold leading-none">✕</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* BOTTOM ACTION BAR (Pricing & High-converting CTA) */}
                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                        Modèle de tarification
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {outil.prix}
                      </span>
                    </div>

                    <a
                      href={outil.lien_affilie}
                      target="_blank"
                      rel="sponsored noopener"
                      className={`py-2.5 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs hover:shadow transition-all group cursor-pointer ${
                        isFirst
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-slate-900 hover:bg-slate-800 text-white"
                      }`}
                    >
                      <span>{outil.texte_cta}</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 4. SECTION FAQ SEO */}
        <FaqSection faq={metier.faq} metierNom={metier.metier} />

        {/* 5. MAILLAGE INTERNE AUTOMATIQUE */}
        <section className="my-16 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Consulter d&apos;autres professions comparées
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explorez nos guides indépendants d&apos;automatisation pour d&apos;autres secteurs d&apos;activité.
              </p>
            </div>
            <Link
              href="/#metiers"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-slate-900"
            >
              <span>Voir les 12 métiers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/metier/${rel.slug}`}
                className="card-hover-effect group bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {rel.categorie_metier}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {rel.temps_gagne_hebdo}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                    {rel.metier}
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                    {rel.intro_accroche}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-blue-600">
                  <span>Accéder à l&apos;analyse</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
