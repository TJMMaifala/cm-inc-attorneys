/**
 * Central business information for CMI Attorneys.
 *
 * Every address, telephone number and credential shown on the website is read from
 * this file. Values are taken from "CMI NEW COMPANY PROFILE 2027.pdf" and are
 * PROVISIONAL until the items in CONTENT-VERIFICATION.md are confirmed by the firm.
 */

export type Phone = { label: string; display: string; tel: string };

export type Office = {
  id: "polokwane" | "sandton";
  name: string;
  region: string;
  addressLines: string[];
  /** Single-line address, used in maps queries and structured data. */
  streetAddress: string;
  locality: string;
  province: string;
  phones: Phone[];
  mapsQuery: string;
};

export const site = {
  name: "CMI Attorneys",
  /** Legal name as it appears in the 2027 company profile (to be confirmed). */
  legalName: "Clarrence Mangena Incorporated",
  tagline: "Attorneys, Notaries & Conveyancers",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://cmincattorneys.co.za").replace(
    /\/$/,
    "",
  ),
  email: "info@cmiattorneys.co.za",
  foundedYear: 2021,
  incorporated: "February 2021",
  description:
    "CMI Attorneys is a South African law firm with offices in Polokwane and Sandton, advising on commercial and corporate law, estate planning, tender and energy law, family law, notarial services and constitutional litigation.",
  credentials: {
    ownership: "100% Black-owned",
    bbbee: "B-BBEE Level 1 contributor",
    procurement: "135% procurement recognition",
  },
} as const;

export const offices: Office[] = [
  {
    id: "polokwane",
    name: "Polokwane Office",
    region: "Limpopo",
    addressLines: [
      "28 Rhodesdrift Street",
      "Rhodesdrift Office Park",
      "Bendor, Polokwane",
      "Limpopo, South Africa",
    ],
    streetAddress: "28 Rhodesdrift Street, Rhodesdrift Office Park, Bendor",
    locality: "Polokwane",
    province: "Limpopo",
    phones: [
      { label: "Telephone", display: "+27 (0)15 880 1882", tel: "+27158801882" },
      { label: "Mobile", display: "+27 (0)78 185 0890", tel: "+27781850890" },
    ],
    mapsQuery:
      "28 Rhodesdrift Street, Rhodesdrift Office Park, Bendor, Polokwane, Limpopo, South Africa",
  },
  {
    id: "sandton",
    name: "Sandton Office",
    region: "Gauteng",
    addressLines: [
      "2 Maude Street",
      "3rd Floor, The Forum",
      "Sandton, Johannesburg",
    ],
    streetAddress: "2 Maude Street, 3rd Floor, The Forum, Sandton",
    locality: "Sandton, Johannesburg",
    province: "Gauteng",
    phones: [
      { label: "Telephone", display: "+27 (0)10 157 3065", tel: "+27101573065" },
    ],
    mapsQuery:
      "The Forum, 2 Maude Street, Sandton, Johannesburg, South Africa",
  },
];

export function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapsDirectionsUrl(query: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}

/** Courts and offices the 2027 profile lists as accessible to the Polokwane office. */
export const accessibleCourts = [
  "Polokwane High Court",
  "Polokwane Magistrate Court",
  "Seshego Magistrate Court",
  "Bochum Magistrate Court",
  "Lebowakgomo Magistrate Court",
  "Mokopane Magistrate Court",
  "Mankweng Magistrate Court",
] as const;

export const accessibleOffices = [
  "Polokwane Deeds Office",
  "Department of Mineral Resources",
  "Master of the High Court",
] as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Our Team", href: "/team" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

export const legalNav = [
  { label: "Privacy Notice", href: "/privacy" },
  { label: "POPIA Information", href: "/popia" },
  { label: "PAIA", href: "/paia" },
  { label: "Legal Disclaimer", href: "/disclaimer" },
] as const;

export const disclaimerShort =
  "The content of this website is general information only and does not constitute legal advice. Contacting the firm through this website does not create an attorney-client relationship.";
