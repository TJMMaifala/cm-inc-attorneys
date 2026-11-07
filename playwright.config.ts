import { defineConfig } from "@playwright/test";

/**
 * End-to-end tests run against the PRODUCTION build (`npm run build` first).
 *
 *  - :3100  app WITH email configured, pointing at a local mock of the Resend API (:4010)
 *  - :3101  app WITHOUT email configured (tests the honest "not configured" failure)
 *
 * Set CHROME_PATH to use a locally installed Chrome/Chromium instead of Playwright's
 * downloaded browser, e.g. CHROME_PATH=/usr/bin/google-chrome
 */
const executablePath = process.env.CHROME_PATH || undefined;

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3100",
    launchOptions: { executablePath },
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    {
      name: "mobile",
      use: { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true },
    },
  ],
  webServer: [
    {
      command: "node tests/e2e/mock-resend.mjs",
      url: "http://localhost:4010/health",
      reuseExistingServer: true,
    },
    {
      command: "npm run start -- -p 3100",
      url: "http://localhost:3100",
      reuseExistingServer: true,
      env: {
        RESEND_API_KEY: "test_key",
        ENQUIRY_FROM_EMAIL: "CMI Website <enquiries@example.test>",
        ENQUIRY_TO_EMAIL: "info@cmiattorneys.co.za",
        RESEND_API_URL: "http://localhost:4010/emails",
        ENQUIRY_RATE_LIMIT: "200",
      },
    },
    {
      command: "npm run start -- -p 3101",
      url: "http://localhost:3101",
      reuseExistingServer: true,
      env: { ENQUIRY_RATE_LIMIT: "3" },
    },
  ],
});
