import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  use: {
    headless: true,
    baseURL: "http://localhost:8080",
  },
  webServer: {
    command: "npm run dev",
    port: 8080,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
