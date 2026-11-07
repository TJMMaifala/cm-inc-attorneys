# Content verification: items for CMI Attorneys to confirm

The website uses **"CMI NEW COMPANY PROFILE 2027.pdf"** as its primary source. Nothing below has been silently resolved: each item shows what the site currently says and what must be confirmed before launch. All business data lives in `src/config/site.ts` (addresses, phones, credentials) and `src/content/` (director, practice areas, community); fixing an answer means editing one place.

## A. Discrepancies listed in the brief

| # | Item | New profile (used provisionally) | Old website (per brief) | Where to change |
|---|------|------|------|------|
| 1 | Polokwane street number | 28 Rhodesdrift Street | 25 Rhodesdrift Street | `src/config/site.ts` (`offices[0]`) |
| 2 | Sandton floor | 3rd Floor, The Forum | 11th Floor | `src/config/site.ts` (`offices[1]`) |
| 3 | Director's LLB conferral date | 17 May 2017 | 17 May 2018 | `src/content/firm.ts` (`directorProfile.timeline`), `src/app/director/page.tsx` |
| 4 | Firm name | CLARRENCE MANGENA INCORPORATED | Clarrence Mangena Inc | `site.legalName` |
| 5 | Director's spelling | see note below | Clarrence | `src/content/firm.ts` |
| 6 | Tagline "Attorneys, Notaries & Conveyancers" | appears in the logo | n/a | `site.tagline`; the logo image itself would also need replacing |
| 7 | Operating hours | not in the profile | n/a | **Not published anywhere on the site** until supplied |

**Note on item 5.** The brief says the profile spells the name "Clarence" in the director section. The supplied PDF actually reads **"Mr Clarrence Mangena"** there, as it does in the firm name, so the site uses **Clarrence** throughout. Please confirm the correct spelling of the Director's name (and of the firm name).

## B. Additional items found while building

| # | Item | Detail |
|---|------|--------|
| 8 | **Old website not inspected** | `https://cmincattorneys.co.za/` could not be fetched during the build (the fetch was refused and searches did not surface it), so items 1–5's "old website" values are taken from the brief and have **not** been checked against the live site. No images were taken from it. |
| 9 | **Domain** | The brief names `cmincattorneys.co.za`, but the profile's email addresses use `cmiattorneys.co.za` (no "n"). Confirm which is the website domain. It is set by `NEXT_PUBLIC_SITE_URL` (canonical URLs, sitemap, structured data). |
| 10 | Photo quality and watermarks | All photographs were cropped from the PDF's page images (the originals were not supplied), so they are low resolution (about 500–850 px wide) and some carry a faint "CMi / Clarrence Mangena" watermark. **Please supply the original photo files**, and the logo as SVG, for sharper results. |
| 11 | Team members | No names, titles or biographies are published because none were supplied. The Team page says profiles will be added once confirmed. |
| 12 | Constitutional Court wording | The profile says the Director worked on "landmark and major cases" in 2020 and 2021. The site says "various major cases in 2020 and 2021" and describes his role as "Law Researcher to Justice Tshiqi". The profile also calls the role "Law Clerk/Researcher" in one place. Confirm the title and wording. |
| 13 | Timeline dates | The profile gives no date for the Practical Legal Training course (only that it preceded 3 September 2018), and no end date for the Constitutional Court role. The timeline says "Before September 2018" and "2020" rather than guessing. |
| 14 | High Court litigation | The profile says the firm's "desire is to build our profile in High Court Civil Litigation". The site says it "is building its profile in High Court civil litigation". Confirm you want that published. |
| 15 | Courts and offices list | The "courts accessible to the firm" list (Polokwane High Court; Polokwane, Seshego, Bochum, Lebowakgomo, Mokopane and Mankweng Magistrate Courts; Polokwane Deeds Office; Department of Mineral Resources; Master of the High Court) comes from the profile's introduction. Confirm it is current. |
| 16 | "135% procurement recognition" | Published as stated in the profile. Confirm it is still accurate and whether a B-BBEE certificate or expiry date should be shown. |
| 17 | Drafted copy | The "How we work" principles on the About page, "Why choose CMI Attorneys" and the general introductory sentences were written for the website from the profile's facts. They contain no statistics or guarantees but need the firm's approval. |
| 18 | Practice-area descriptions | Re-worded from profile pages 5 and 6; no services were added. The profile's "Corporate law", "Trust law" and "Debt review ... evictions" overview items were separated into the additional-services section. **All descriptions need CMI review before publication.** |
| 19 | Community work | Four activities from the profile, with no figures, beneficiaries or partners invented. Confirm accuracy, and which university runs the competition if it may be named. |
| 20 | Draft legal pages | `/privacy`, `/popia`, `/paia`, `/disclaimer` are **drafts** with bracketed gaps (Information Officer, retention periods, cross-border transfer safeguards, Legal Practice Council statement, PAIA manual). They are set to `noindex` and are not in the sitemap. Once approved, remove `noindex: true` in each page and add them to `src/app/sitemap.ts`. No PAIA manual link is shown until the document is supplied. |
| 21 | Email delivery | Enquiries are delivered through Resend. Confirm the destination address(es), sender domain and that sending customer data through Resend is acceptable (POPIA section 72 cross-border transfer). |
| 22 | Social profiles and reviews | None are linked and no ratings or reviews are published. Supply links if wanted. |
| 23 | Map coordinates | Maps use address-based Google Maps links (no embeds, no cookies). Supply exact pins if the addresses do not resolve well. |

## Never invented

Qualifications, admission dates, credentials, testimonials, awards, case results, staff identities, telephone numbers, addresses and legal service capabilities all come from the profile. Anything not in the profile is either absent or marked above.
