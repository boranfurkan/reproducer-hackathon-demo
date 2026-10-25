import { defineConfig } from "@playwright/test";

const port = process.env.PORT || 3000;

export default defineConfig({
  testDir: "./tests",
  use: { baseURL: `http://localhost:${port}`, timezoneId: "UTC", locale: "en-GB" },
  webServer: {
    command: "npm start",
    url: `http://localhost:${port}/api/books`,
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
