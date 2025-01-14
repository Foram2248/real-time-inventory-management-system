import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests", // Directory where test files are located
  timeout: 30 * 1000, // Maximum test timeout
  use: {
    headless: true, // Run tests in headless mode
    baseURL: "http://localhost:8080", // Your frontend's base URL
  },
  webServer: {
    command: "npm run dev", // Start the Svelte frontend server
    port: 8080,
    timeout: 120 * 1000, // Wait for the server to start
    reuseExistingServer: !process.env.CI,
  },
});
