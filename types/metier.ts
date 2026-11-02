export interface Outil {
  nom: string;
  badge: string;
  categorie: string;
  prix: string;
  note: number;
  description: string;
  avantages: string[];
  inconvenients: string[];
  cas_usage_metier: string;
  lien_affilie: string;
  texte_cta: string;
}

export interface FAQItem {
  question: string;
  reponse: string;
}

export interface Metier {
  slug: string;
  metier: string;
  categorie_metier: string;
  titre_seo: string;
  meta_description: string;
  intro_accroche: string;
  temps_gagne_hebdo: string;
  outils: Outil[];
  faq: FAQItem[];
}
