/**
 * Practice-area content.
 *
 * Source: "CMI NEW COMPANY PROFILE 2027.pdf" (pages 5 and 6). Wording has been edited for
 * the web but no services have been added. ALL descriptions require review by CMI
 * before publication (see CONTENT-VERIFICATION.md).
 */

export type ImageKey =
  | "team-group"
  | "team-standing"
  | "team-laptop"
  | "team-three"
  | "buildings"
  | "director";

export type ServiceCategory = {
  title: string;
  description?: string;
  items: string[];
};

export type PracticeArea = {
  slug: string;
  number: string;
  title: string;
  /** Short label for menus and chips. */
  shortTitle: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  categories: ServiceCategory[];
  image: ImageKey;
  imageAlt: string;
  /** Slugs of other practice areas that are naturally connected. */
  related: string[];
  /** Additional-service ids (see additionalServices) relevant to this area. */
  relatedAdditional: string[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "commercial-corporate-law",
    number: "01",
    title: "Commercial and Corporate Matters",
    shortTitle: "Commercial & Corporate",
    summary:
      "Advice and documentation for companies and commercial entities, from governance and corporate finance to commercial contracts, disputes and workplace matters.",
    metaTitle: "Commercial and Corporate Law Attorneys | CMI Attorneys",
    metaDescription:
      "Corporate and commercial legal services from CMI Attorneys in Polokwane and Sandton: corporate governance, mergers and acquisitions, commercial contracts, debt collection and employment matters.",
    intro: [
      "CMI Attorneys provides legal assistance to corporate and commercial entities on corporate personality and corporate governance. The firm also assists with disputes relating to equity financing, capital structure, and mergers and acquisitions.",
      "Corporate finance remains relevant even in the smallest companies, where control and capital structure are interdependent. The firm assists with drafting commercial contracts, such as Memoranda of Incorporation and association agreements, and provides litigation assistance in commercial and corporate disputes.",
      "As part of its commercial work and corporate governance, the firm assists employers with the management of employment contracts, chairing disciplinary enquiries, drafting disciplinary hearing reports and preparing workplace policies.",
    ],
    categories: [
      {
        title: "Advisory and corporate governance",
        items: [
          "Corporate and commercial legal advice",
          "Corporate governance",
          "Corporate personality",
          "Equity financing and capital structures",
          "Mergers and acquisitions",
          "Corporate restructuring",
        ],
      },
      {
        title: "Company documentation and contracts",
        items: [
          "Company incorporation documentation, including Memoranda of Incorporation",
          "Shareholder agreements",
          "Association agreements",
          "Drafting of commercial contracts",
        ],
      },
      {
        title: "Disputes and recovery",
        items: ["Commercial disputes", "Debt collection"],
      },
      {
        title: "Employment and workplace matters",
        description: "Support for employers (mainly entities).",
        items: [
          "Employment contracts",
          "Chairing disciplinary enquiries and drafting hearing reports",
          "Workplace policies and procedures",
        ],
      },
    ],
    image: "team-laptop",
    imageAlt:
      "CMI Attorneys team members reviewing a matter together on a laptop in the firm's office",
    related: ["constitutional-litigation-public-law", "tender-energy-mineral-rights-law"],
    relatedAdditional: ["corporate-company-law", "insolvency-liquidations"],
  },
  {
    slug: "estate-planning-wills-deceased-estates",
    number: "02",
    title: "Estate Planning, Wills and Administration of Deceased Estates",
    shortTitle: "Estate Planning & Wills",
    summary:
      "Estate planning schedules, trusts, last wills and testaments, living wills and the administration of deceased estates.",
    metaTitle: "Estate Planning, Wills & Deceased Estates | CMI Attorneys",
    metaDescription:
      "Estate planning, trust establishment, wills, living wills and administration of deceased estates from CMI Attorneys, with offices in Polokwane and Sandton.",
    intro: [
      "Planning for the future of your family and your assets is a decision best made in good time. CMI Attorneys assists clients with estate planning and with the drafting of the documents that give it effect.",
      "The firm also assists with the administration of deceased estates. Estate planning is also part of the firm's community work, which includes visits to old-age centres to speak with pensioners about the subject.",
    ],
    categories: [
      {
        title: "Estate planning",
        items: ["Estate planning schedules", "Trust establishment"],
      },
      {
        title: "Wills",
        items: ["Drafting of last wills and testaments", "Drafting of living wills"],
      },
      {
        title: "Administration of estates",
        items: ["Deceased estate administration"],
      },
    ],
    image: "team-standing",
    imageAlt: "Four members of the CMI Attorneys team standing in front of law reports",
    related: ["notarial-services", "family-and-marriage-law"],
    relatedAdditional: ["trust-law"],
  },
  {
    slug: "tender-energy-mineral-rights-law",
    number: "03",
    title: "Tender Law, Energy Law and Mineral Rights",
    shortTitle: "Tender, Energy & Mineral Rights",
    summary:
      "Construction disputes and JBCC contracts, tender and procurement matters, energy and tariff disputes, and mineral rights matters.",
    metaTitle: "Tender, Procurement, Energy & Mineral Rights Law | CMI Attorneys",
    metaDescription:
      "Tender and procurement law, construction disputes and JBCC contracts, energy and electricity tariff disputes, and mineral rights matters. CMI Attorneys, Polokwane and Sandton.",
    intro: [
      "CMI Attorneys assists with construction disputes, including the drafting of construction agreements and JBCC contracts, and with tender law matters.",
      "The firm also assists with disputes involving energy suppliers, whether electricity or tariff disputes, and with mineral rights-related matters as part of its notarial work. The firm has access to the Department of Mineral Resources.",
    ],
    categories: [
      {
        title: "Construction",
        items: [
          "Construction disputes",
          "Drafting of construction agreements and JBCC contracts",
        ],
      },
      {
        title: "Tender and procurement",
        description: "Including, but not limited to:",
        items: [
          "Reviewing tender awards",
          "Drafting of procurement documents",
          "Legal opinions on the interpretation of tender documents and tender internal policies",
        ],
      },
      {
        title: "Energy",
        items: [
          "Disputes involving energy suppliers",
          "Electricity disputes and tariff disputes",
        ],
      },
      {
        title: "Mineral rights",
        items: ["Mineral rights-related matters, as part of the firm's notarial work"],
      },
    ],
    image: "buildings",
    imageAlt: "Glass office towers photographed from below against a pale sky",
    related: ["commercial-corporate-law", "notarial-services"],
    relatedAdditional: ["municipal-law", "review-applications"],
  },
  {
    slug: "family-and-marriage-law",
    number: "04",
    title: "Family Law and Marriage Law",
    shortTitle: "Family & Marriage Law",
    summary:
      "Advice on matrimonial property systems, ante-nuptial and other matrimonial agreements, divorce proceedings and children's rights.",
    metaTitle: "Family Law & Marriage Law Attorneys | CMI Attorneys",
    metaDescription:
      "Family and marriage law services from CMI Attorneys: matrimonial property systems, ante-nuptial contracts, divorce proceedings and children's rights, including custody.",
    intro: [
      "CMI Attorneys provides legal advice on matrimonial property systems and drafts ante-nuptial contracts and other matrimonial law contracts.",
      "The firm also provides legal representation in divorce proceedings, and services in children's rights law, including custody.",
    ],
    categories: [
      {
        title: "Marriage and matrimonial property",
        items: [
          "Legal advice on matrimonial property systems",
          "Drafting of ante-nuptial contracts",
          "Other matrimonial law contracts and agreements",
        ],
      },
      {
        title: "Divorce",
        items: ["Legal representation in divorce proceedings"],
      },
      {
        title: "Children's rights",
        items: ["Children's rights law, including custody"],
      },
    ],
    image: "team-group",
    imageAlt: "The CMI Attorneys team seated and standing together in the firm's library office",
    related: ["notarial-services", "estate-planning-wills-deceased-estates"],
    relatedAdditional: [],
  },
  {
    slug: "notarial-services",
    number: "05",
    title: "Notarial Services",
    shortTitle: "Notarial Services",
    summary:
      "Ante-nuptial and post-nuptial agreements, notarial bonds, servitudes, sectional title deeds, notarial leases, wills, trusts, donations and authentication of documents.",
    metaTitle: "Notarial Services | CMI Attorneys Polokwane & Sandton",
    metaDescription:
      "Notarial services from CMI Attorneys: ante-nuptial and post-nuptial agreements, notarial bonds, servitudes, sectional title notarial deeds, notarial leases, donations and authentication of documents.",
    intro: [
      "CMI Attorneys does notarial work, including the drafting of ante-nuptial and post-nuptial agreements, notarial bonds, servitudes, notarial deeds in respect of sectional title schemes, notarial leases, wills, trusts and donations, and the authentication of documents.",
      "The firm has access to the Polokwane Deeds Office and the Master of the High Court.",
    ],
    categories: [
      {
        title: "Marital agreements",
        items: ["Ante-nuptial agreements", "Post-nuptial agreements"],
      },
      {
        title: "Property-related notarial work",
        items: [
          "Notarial bonds",
          "Servitudes",
          "Notarial deeds for sectional title schemes",
          "Notarial leases",
        ],
      },
      {
        title: "Estate and gift documents",
        items: ["Wills", "Trusts", "Donations"],
      },
      {
        title: "Authentication",
        items: ["Authentication of documents and all other related matters"],
      },
    ],
    image: "team-three",
    imageAlt: "Three male attorneys of CMI Attorneys standing with arms folded in front of law reports",
    related: ["family-and-marriage-law", "estate-planning-wills-deceased-estates"],
    relatedAdditional: ["trust-law"],
  },
  {
    slug: "constitutional-litigation-public-law",
    number: "06",
    title: "Constitutional Litigation and Public Law",
    shortTitle: "Constitutional Litigation",
    summary:
      "Constitutional and public law litigation, High Court and Magistrates' Court civil litigation, bank-related recoveries and damages claims.",
    metaTitle: "Constitutional Litigation & Public Law | CMI Attorneys",
    metaDescription:
      "Constitutional litigation, public law and civil litigation in the High Court and Magistrates' Courts, including debt collection, car repossession, guarantees and damages claims. CMI Attorneys.",
    intro: [
      "The firm's director worked with Constitutional Court Justices on various major cases in 2020 and 2021, and the firm's work includes constitutional litigation and public law matters, both litigious (in the High Court and Magistrates' Courts) and non-litigious.",
      "The firm is building its profile in High Court civil litigation, and has experience in car repossession matters and debt collection for banks. It also handles general damages claims, whether contractual or delictual, including correspondence work, court appearances and related matters.",
    ],
    categories: [
      {
        title: "Constitutional and public law",
        items: ["Constitutional litigation", "Public law matters"],
      },
      {
        title: "Civil litigation",
        items: [
          "High Court civil litigation",
          "Magistrates' Court matters",
          "General litigation",
        ],
      },
      {
        title: "Recoveries and finance",
        items: [
          "Car repossession matters",
          "Debt collection for banks",
          "Guarantees",
        ],
      },
      {
        title: "Damages claims",
        items: [
          "Contractual damages claims",
          "Delictual damages claims",
          "Related correspondence, court appearances and other related matters",
        ],
      },
    ],
    image: "team-group",
    imageAlt: "The CMI Attorneys team gathered in the firm's library office",
    related: ["commercial-corporate-law", "tender-energy-mineral-rights-law"],
    relatedAdditional: ["review-applications", "evictions", "insurance-claims", "debt-review"],
  },
];

export type AdditionalService = {
  id: string;
  title: string;
  /** If the service is already covered by a main practice-area page, link to it. */
  href?: string;
};

export type AdditionalServiceGroup = {
  title: string;
  services: AdditionalService[];
};

/**
 * Additional services named in the profile's practice-area overview (page 5).
 * "Corporate / Company law" and "Trust law" are listed in the profile but already sit
 * inside main practice areas, so they link there rather than duplicating content.
 */
export const additionalServiceGroups: AdditionalServiceGroup[] = [
  {
    title: "Disputes, applications and claims",
    services: [
      { id: "review-applications", title: "Common-law and statutory review applications" },
      { id: "evictions", title: "Evictions" },
      { id: "insurance-claims", title: "Insurance claims" },
      { id: "debt-review", title: "Debt review applications under the National Credit Act" },
    ],
  },
  {
    title: "Insolvency and restructuring",
    services: [{ id: "insolvency-liquidations", title: "Insolvency and liquidations" }],
  },
  {
    title: "Public administration and immigration",
    services: [
      { id: "municipal-law", title: "Municipal law and administration" },
      { id: "immigration-law", title: "Immigration and emigration law" },
    ],
  },
  {
    title: "Corporate and trust law",
    services: [
      {
        id: "corporate-company-law",
        title: "Corporate and company law",
        href: "/practice-areas/commercial-corporate-law",
      },
      {
        id: "trust-law",
        title: "Trust law",
        href: "/practice-areas/estate-planning-wills-deceased-estates",
      },
    ],
  },
];

export const additionalServices: AdditionalService[] = additionalServiceGroups.flatMap(
  (g) => g.services,
);

export function getPracticeArea(slug: string) {
  return practiceAreas.find((a) => a.slug === slug);
}

export function getAdditionalService(id: string) {
  return additionalServices.find((s) => s.id === id);
}

/** Options for the enquiry form's practice-area select. */
export const enquiryTopics: { value: string; label: string }[] = [
  ...practiceAreas.map((a) => ({ value: a.slug, label: a.title })),
  { value: "additional-services", label: "Other / additional services" },
  { value: "not-sure", label: "I am not sure" },
];
