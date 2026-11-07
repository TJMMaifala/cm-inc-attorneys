import type { ImageKey } from "./practice-areas";

/** Image registry: single place to manage paths, intrinsic sizes and default alt text. */
export const images: Record<
  ImageKey,
  { src: string; width: number; height: number; alt: string }
> = {
  "team-group": {
    src: "/images/team-group.webp",
    width: 837,
    height: 572,
    alt: "The CMI Attorneys team gathered in the firm's library office, some seated and some standing",
  },
  "team-standing": {
    src: "/images/team-standing.webp",
    width: 645,
    height: 457,
    alt: "Four members of the CMI Attorneys team standing in front of law reports",
  },
  "team-laptop": {
    src: "/images/team-laptop.webp",
    width: 645,
    height: 616,
    alt: "CMI Attorneys team members reviewing a matter together on a laptop",
  },
  "team-three": {
    src: "/images/team-three.webp",
    width: 504,
    height: 482,
    alt: "Three attorneys of CMI Attorneys standing in front of law reports",
  },
  buildings: {
    src: "/images/buildings.webp",
    width: 855,
    height: 1079,
    alt: "Glass office towers photographed from below against a pale sky",
  },
  director: {
    src: "/images/director.webp",
    width: 706,
    height: 1079,
    alt: "Portrait of Mr Clarrence Mangena, Director of CMI Attorneys",
  },
};

export const directorProfile = {
  /** Spelling follows the 2027 profile and the firm's registered style; see CONTENT-VERIFICATION.md. */
  name: "Mr Clarrence Mangena",
  role: "Director",
  intro:
    "Mr Mangena obtained his LLB from the University of Venda in 2017. He was admitted as an Attorney of the High Court on 29 November 2019, after completing his articles with Espag Magwai Attorneys, and later served as a Law Researcher to Justice Tshiqi at the Constitutional Court of South Africa.",
  timeline: [
    {
      date: "2017",
      title: "LLB, University of Venda",
      body: "Obtained his LLB, officially conferred on 17 May 2017.",
    },
    {
      date: "Before September 2018",
      title: "Practical Legal Training, Polokwane",
      body: "Completed a six-month training course with the Practical Legal Training in Polokwane.",
    },
    {
      date: "3 September 2018",
      title: "Joined Espag Magwai Attorneys",
      body: "Began his period of articles with the firm.",
    },
    {
      date: "29 November 2019",
      title: "Admitted as an Attorney of the High Court",
      body: "Admitted after successfully completing his period of articles with Espag Magwai Attorneys.",
    },
    {
      date: "25 June 2020",
      title: "Associate at Espag Magwai Attorneys",
      body: "Continued his employment with the firm as an Associate until 25 June 2020.",
    },
    {
      date: "2020",
      title: "Law Researcher, Constitutional Court of South Africa",
      body: "Assumed duties as a Law Researcher to Justice Tshiqi, after leaving Espag Magwai Attorneys.",
    },
    {
      date: "2021",
      title: "CMI Attorneys established",
      body: "The firm was established in 2021 under the name and style Clarrence Mangena Incorporated, and incorporated in February 2021.",
    },
  ],
  espagDuties: [
    "Attending client consultations",
    "Drafting pleadings in High Court and Magistrates' Court civil matters",
    "Making court appearances in the Magistrates' Court",
    "Advising on and drafting commercial and residential leases",
    "Attending to civil (commercial) matters in the High Court and Magistrates' Courts",
    "Lodgements and preparations for the Deeds Registry office",
    "Preparing and drafting wills and estate documents",
    "Litigious and non-litigious services in corporate and commercial law and customary law matters",
    "Drafting commercial contracts, and preparing general appeals and constitutional appeals",
  ],
  constitutionalCourtDuties: [
    "Preparing analytical summaries of written argument or evidence and assessing arguments in the light of case law and legal literature",
    "Conducting detailed research on particular topics",
    "Preparing pre-hearing chronologies, memoranda, media summaries and opinions, and identifying key issues in pending matters",
    "Assisting the judge in court, case-calling and ensuring that oral hearings take place with propriety and efficiency",
    "Taking detailed notes of oral arguments",
    "Assisting the judge with court-related work such as committees, organisational work and international human rights work",
    "Cite-checking draft judgments before delivery",
  ],
};

export const communityInitiatives = [
  {
    number: "01",
    title: "Estate planning for pensioners",
    body: "The firm visits old-age centres to speak with pensioners about estate planning and related matters.",
  },
  {
    number: "02",
    title: "Career information at rural schools",
    body: "Each year the firm visits rural-based schools to give learners career information about various institutions.",
  },
  {
    number: "03",
    title: "Constitutional litigation competition",
    body: "As part of its constitutional litigation department, the firm hosts an annual competition with an elected university, engaging its students on constitutional concepts.",
  },
  {
    number: "04",
    title: "Pro bono work",
    body: "The firm also provides pro bono legal work where it is needed.",
  },
] as const;

export const whyChoose = [
  {
    title: "Courtroom and constitutional experience",
    body: "The firm's director has served as a Law Researcher at the Constitutional Court of South Africa and practised as an associate in civil and commercial litigation.",
  },
  {
    title: "Six principal practice areas, one firm",
    body: "From commercial contracts and wills to tenders and constitutional litigation, related matters can be handled under one roof.",
  },
  {
    title: "Present in Limpopo and Gauteng",
    body: "Offices in Polokwane and Sandton, with access to courts and registries across the Polokwane region.",
  },
  {
    title: "Black-owned, B-BBEE Level 1",
    body: "A 100% Black-owned firm and B-BBEE Level 1 contributor with 135% procurement recognition.",
  },
  {
    title: "Committed to the community",
    body: "Estate-planning visits to pensioners, school career days, a university constitutional-law competition and pro bono work.",
  },
] as const;
