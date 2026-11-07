import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const areaSlugs = [
  "commercial-corporate-law",
  "estate-planning-wills-deceased-estates",
  "tender-energy-mineral-rights-law",
  "family-and-marriage-law",
  "notarial-services",
  "constitutional-litigation-public-law",
];

const routes = [
  "/",
  "/about",
  "/director",
  "/team",
  "/practice-areas",
  ...areaSlugs.map((s) => `/practice-areas/${s}`),
  "/community",
  "/insights",
  "/contact",
  "/privacy",
  "/popia",
  "/paia",
  "/disclaimer",
];

async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    const step = Math.max(400, window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 300));
    window.scrollTo(0, 0);
  });
}

test.describe("pages render correctly", () => {
  for (const route of routes) {
    test(`${route}`, async ({ page }) => {
      const problems: string[] = [];
      page.on("console", (m) => {
        if (m.type() === "error") problems.push(`console: ${m.text()}`);
      });
      page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
      page.on("response", (r) => {
        if (r.status() >= 400) problems.push(`HTTP ${r.status()} ${r.url()}`);
      });

      const res = await page.goto(route, { waitUntil: "networkidle" });
      expect(res?.status()).toBe(200);

      await expect(page.locator("h1")).toHaveCount(1);
      expect((await page.title()).length).toBeGreaterThan(10);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{50,}/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /^https?:\/\/.+/);

      await scrollThrough(page);
      await page.waitForLoadState("networkidle");

      // Lazy images can still be in flight on a slow machine, so poll rather than sample once.
      await expect
        .poll(
          () =>
            page.$$eval("img", (imgs) =>
              imgs
                .filter((i) => i.getClientRects().length > 0) // ignore display:none images
                .filter((i) => !(i.complete && i.naturalWidth > 0))
                .map((i) => i.currentSrc || i.src),
            ),
          { message: "broken images", timeout: 30_000 },
        )
        .toEqual([]);

      const missingAlt = await page.$$eval("img:not([alt])", (n) => n.length);
      expect(missingAlt).toBe(0);

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, "horizontal overflow (px)").toBeLessThanOrEqual(1);

      expect(problems).toEqual([]);
    });
  }
});

test.describe("accessibility (axe, WCAG 2.2 AA rules)", () => {
  for (const route of routes) {
    test(`${route}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route, { waitUntil: "networkidle" });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      const summary = results.violations.map(
        (v) => `${v.id} (${v.impact}): ${v.nodes.length} node(s), e.g. ${v.nodes[0]?.target.join(" ")}`,
      );
      expect(summary).toEqual([]);
    });
  }
});

test("every internal link resolves and contact links are well-formed", async ({ page, request }) => {
  const internal = new Set<string>();
  const tel = new Set<string>();
  const mail = new Set<string>();
  for (const route of routes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href") as string));
    for (const h of hrefs) {
      if (h.startsWith("tel:")) tel.add(h);
      else if (h.startsWith("mailto:")) mail.add(h);
      else if (h.startsWith("/")) internal.add(h.split("#")[0].split("?")[0] || "/");
    }
  }
  for (const path of internal) {
    const res = await request.get(path);
    expect(res.status(), `link ${path}`).toBeLessThan(400);
  }
  expect([...tel].sort()).toEqual(["tel:+27101573065", "tel:+27158801882", "tel:+27781850890"]);
  expect([...mail]).toEqual(["mailto:info@cmiattorneys.co.za"]);
});

test("seo files", async ({ request }) => {
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap: https://cmincattorneys.co.za/sitemap.xml");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const s of areaSlugs) expect(sitemap).toContain(`/practice-areas/${s}`);
  expect(sitemap).not.toContain("/privacy");
  const home = await (await request.get("/")).text();
  expect(home).toContain("application/ld+json");
  expect(home).toContain('"@type":"LegalService"');
  expect(home).not.toMatch(/aggregateRating|"review"/);
});

test("anchors and in-page anchors exist", async ({ page }) => {
  await page.goto("/practice-areas#additional-services");
  await expect(page.locator("#additional-services")).toBeVisible();
  await page.goto("/contact#consultation");
  await expect(page.locator("#consultation form")).toBeVisible();
});

test.describe("navigation", () => {
  test("desktop dropdown and CTA", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await nav.getByRole("button", { name: "Show practice areas" }).hover();
    const menu = page.locator("#practice-menu");
    await expect(menu.getByRole("link")).toHaveCount(7);
    await menu.getByRole("link", { name: "Notarial Services" }).click();
    await expect(page).toHaveURL(/\/practice-areas\/notarial-services$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Notarial Services");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Request a consultation" }).click();
    await expect(page).toHaveURL(/\/contact#consultation$/);
  });

  test("dropdown opens with keyboard", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Show practice areas" });
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  test("mobile menu opens, traps Escape and navigates", async ({ page }, info) => {
    test.skip(info.project.name !== "mobile");
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Site menu" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: "+27 (0)15 880 1882" })).toHaveAttribute("href", "tel:+27158801882");
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await page.getByRole("button", { name: "Open menu" }).click();
    await dialog.getByRole("link", { name: "About", exact: true }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(dialog).toBeHidden();
  });

  test("header turns solid after scrolling", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");
    await expect(header).not.toHaveClass(/bg-white/);
    await page.evaluate(() => window.scrollTo(0, 600));
    await expect(header).toHaveClass(/bg-white/);
  });
});

test.describe("reduced motion", () => {
  test("content is visible without scroll-reveal when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/practice-areas", { waitUntil: "networkidle" });
    expect(await page.evaluate(() => document.documentElement.classList.contains("motion"))).toBe(false);
    await expect(page.getByText("Estate Planning, Wills and Administration of Deceased Estates").first()).toBeVisible();
  });
});

test.describe("practice area content", () => {
  test("detail pages have CTA with pre-selected topic and related links", async ({ page }) => {
    await page.goto("/practice-areas/family-and-marriage-law");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Family Law and Marriage Law");
    await expect(page.getByText("Divorce proceedings").first()).toBeVisible();
    await page.getByRole("link", { name: "Enquire about this area" }).click();
    await expect(page).toHaveURL(/\/contact\?topic=family-and-marriage-law#consultation/);
    await expect(page.locator('select[name="practiceArea"]')).toHaveValue("family-and-marriage-law");
  });

  test("all six areas plus additional services are present", async ({ page }) => {
    await page.goto("/practice-areas");
    for (const slug of areaSlugs) {
      await expect(page.locator(`main a[href="/practice-areas/${slug}"]`).first()).toBeVisible();
    }
    for (const s of [
      "Immigration and emigration law",
      "Municipal law and administration",
      "Insurance claims",
      "Debt review applications under the National Credit Act",
      "Evictions",
      "Common-law and statutory review applications",
      "Insolvency and liquidations",
      "Trust law",
      "Corporate and company law",
    ]) {
      await expect(page.locator("#additional-services li", { hasText: s }).first()).toBeVisible();
    }
  });

  test("unknown routes show the 404 page", async ({ page }) => {
    const res = await page.goto("/practice-areas/does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("could not be found");
    const res2 = await page.goto("/insights/does-not-exist");
    expect(res2?.status()).toBe(404);
  });

  test("insights shows an honest empty state", async ({ page }) => {
    await page.goto("/insights");
    await expect(page.getByText("No articles have been published yet")).toBeVisible();
  });
});

/* ---------------------------- Enquiry form ---------------------------- */

async function fillValid(page: Page, message = "I would like to discuss drafting a shareholder agreement for a new company.") {
  await page.getByLabel(/Full name/).fill("Thandi Nkosi");
  await page.getByLabel(/Email address/).fill("thandi@example.com");
  await page.getByLabel(/Contact number/).fill("082 123 4567");
  await page.getByLabel(/Preferred office/).selectOption("sandton");
  await page.locator('select[name="practiceArea"]').selectOption("commercial-corporate-law");
  await page.getByLabel(/Preferred contact method/).selectOption("email");
  await page.getByLabel(/Brief enquiry/).fill(message);
  await page.getByLabel(/I have read the/).check();
}

test.describe("consultation form", () => {
  test("client-side validation blocks empty and invalid submissions", async ({ page }) => {
    await page.goto("/contact");
    let requests = 0;
    page.on("request", (r) => r.url().includes("/api/enquiry") && requests++);

    await page.getByRole("button", { name: /Send consultation request/ }).click();
    const alert = page.getByRole("alert").first();
    await expect(alert).toContainText("these 8 fields");
    await expect(page.getByLabel(/Email address/)).toHaveAttribute("aria-invalid", "true");
    await expect(alert).toBeFocused();

    await page.getByLabel(/Full name/).fill("A");
    await page.getByLabel(/Email address/).fill("not-an-email");
    await page.getByLabel(/Contact number/).fill("abc");
    await page.getByRole("button", { name: /Send consultation request/ }).click();
    await expect(page.getByText("Please enter a valid email address", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("Please enter a valid contact number", { exact: false }).first()).toBeVisible();
    expect(requests).toBe(0);
  });

  test("successful submission is confirmed only after the server confirms", async ({ page, request }, info) => {
    test.skip(info.project.name !== "desktop");
    await page.goto("/contact");
    await page.waitForTimeout(3300); // the form rejects submissions made within 3 seconds of loading
    await fillValid(page, "Please call me about a <script>alert(1)</script> shareholder agreement for my company.");
    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes("/api/enquiry")),
      page.getByRole("button", { name: /Send consultation request/ }).click(),
    ]);
    expect(response.status()).toBe(200);
    await expect(page.getByRole("status")).toContainText("Consultation request sent");
    await expect(page.getByRole("status")).toContainText("not a confirmed appointment");

    const last = await (await request.get("http://localhost:4010/last")).json();
    expect(last.auth).toBe("Bearer test_key");
    expect(last.body.to).toEqual(["info@cmiattorneys.co.za"]);
    expect(last.body.reply_to).toBe("thandi@example.com");
    expect(last.body.subject).toContain("Thandi Nkosi");
    expect(last.body.html).not.toContain("<script>");
    expect(last.body.html).toContain("&lt;script&gt;");
    expect(last.body.text).toContain("Preferred office: Sandton");
  });

  test("provider failure shows an error, never a success message", async ({ page, request }, info) => {
    test.skip(info.project.name !== "desktop");
    await request.post("http://localhost:4010/mode", { data: { mode: "fail" } });
    try {
      await page.goto("/contact");
      await page.waitForTimeout(3300);
      await fillValid(page);
      await page.getByRole("button", { name: /Send consultation request/ }).click();
      await expect(page.getByRole("alert").filter({ hasText: "has not been sent" })).toBeVisible();
      await expect(page.getByText("Consultation request sent")).toHaveCount(0);
      await expect(page.getByRole("link", { name: "+27 (0)15 880 1882" }).first()).toBeVisible();
      await expect(page.getByLabel(/Full name/)).toHaveValue("Thandi Nkosi"); // input is preserved
    } finally {
      await request.post("http://localhost:4010/mode", { data: { mode: "ok" } });
    }
  });

  test("when email is not configured the form says so honestly", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop");
    await page.goto("http://localhost:3101/contact");
    await page.waitForTimeout(3300);
    await fillValid(page);
    await page.getByRole("button", { name: /Send consultation request/ }).click();
    await expect(page.getByRole("alert").filter({ hasText: "has not been sent" })).toBeVisible();
    await expect(page.getByText("temporarily unavailable")).toBeVisible();
    await expect(page.getByText("Consultation request sent")).toHaveCount(0);
  });

  test("submitting too quickly asks the visitor to try again", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop");
    await page.goto("/contact");
    await fillValid(page);
    await page.getByRole("button", { name: /Send consultation request/ }).click();
    await expect(page.getByText("press send again")).toBeVisible();
    await expect(page.getByText("Consultation request sent")).toHaveCount(0);
  });
});

test.describe("enquiry API", () => {
  const good = {
    fullName: "Thandi Nkosi",
    email: "thandi@example.com",
    phone: "0821234567",
    office: "polokwane",
    practiceArea: "notarial-services",
    contactMethod: "phone",
    message: "I need an ante-nuptial contract drafted before my wedding.",
    privacyAccepted: true,
  };
  const origin = { Origin: "http://localhost:3100" };

  test.beforeEach(({}, info) => test.skip(info.project.name !== "desktop"));

  test("rejects requests without a same-origin Origin header", async ({ request }) => {
    const res = await request.post("/api/enquiry", { data: good });
    expect(res.status()).toBe(403);
    const evil = await request.post("/api/enquiry", { data: good, headers: { Origin: "https://evil.example" } });
    expect(evil.status()).toBe(403);
  });

  test("rejects non-JSON and malformed bodies", async ({ request }) => {
    const form = await request.post("/api/enquiry", { headers: origin, form: { a: "b" } });
    expect(form.status()).toBe(415);
    const bad = await request.post("/api/enquiry", {
      headers: { ...origin, "Content-Type": "application/json" },
      data: "{not json",
    });
    expect(bad.status()).toBe(400);
  });

  test("server-side validation returns field errors", async ({ request }) => {
    const res = await request.post("/api/enquiry", {
      headers: origin,
      data: { ...good, email: "nope", phone: "1", message: "short", privacyAccepted: false, office: "mars" },
    });
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(body.ok).toBe(false);
    expect(Object.keys(body.errors).sort()).toEqual(["email", "message", "office", "phone", "privacyAccepted"]);
  });

  test("valid request is relayed to the email provider and headers cannot be injected", async ({ request }) => {
    const res = await request.post("/api/enquiry", {
      headers: origin,
      data: { ...good, fullName: "Thandi\r\nBcc: attacker@example.com" },
    });
    expect(res.status()).toBe(200);
    expect((await res.json()).ok).toBe(true);
    const last = await (await request.get("http://localhost:4010/last")).json();
    expect(last.body.subject).not.toMatch(/[\r\n]/);
    expect(last.body.to).toEqual(["info@cmiattorneys.co.za"]);
  });

  test("honeypot submissions are silently dropped (nothing is emailed)", async ({ request }) => {
    const before = await (await request.get("http://localhost:4010/last")).json();
    const res = await request.post("/api/enquiry", {
      headers: origin,
      data: { ...good, fullName: "Spam Bot", website: "http://spam.example" },
    });
    expect(res.status()).toBe(200);
    const after = await (await request.get("http://localhost:4010/last")).json();
    expect(after).toEqual(before);
  });

  test("GET is not allowed", async ({ request }) => {
    const res = await request.get("/api/enquiry");
    expect(res.status()).toBe(405);
  });

  test("rate limiting kicks in", async ({ request }) => {
    const base = "http://localhost:3101";
    const hdr = { Origin: base, "X-Forwarded-For": "203.0.113.9" };
    const statuses: number[] = [];
    for (let i = 0; i < 4; i++) {
      const r = await request.post(`${base}/api/enquiry`, { headers: hdr, data: { ...good, message: "short" } });
      statuses.push(r.status());
      if (r.status() === 429) expect(r.headers()["retry-after"]).toBeTruthy();
    }
    expect(statuses).toEqual([422, 422, 422, 429]);
  });
});

test("security headers are present", async ({ request }) => {
  const res = await request.get("/");
  const h = res.headers();
  expect(h["x-frame-options"]).toBe("DENY");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["strict-transport-security"]).toContain("max-age");
  expect(h["referrer-policy"]).toBeTruthy();
  expect(h["x-powered-by"]).toBeUndefined();
});
