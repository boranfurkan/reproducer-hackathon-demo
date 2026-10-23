import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: { baseURL: "http://localhost:3000" },
  webServer: {
    command: "npm run build && npm start",
    url: "http://localhost:3000/api/categories",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
