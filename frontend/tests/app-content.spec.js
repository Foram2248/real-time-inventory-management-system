import { test, expect } from "@playwright/test";

test("Page contains the correct title and heading", async ({ page }) => {
  // Navigate to the app's root URL
  await page.goto("http://localhost:8080");

  // Verify the page title
  await expect(page).toHaveTitle(/Real-Time Inventory Management/);

  // Locate the <h1> tag by its id and verify its text
  const heading = page.locator("#main-heading");
  await expect(heading).toHaveText("Real-Time Product Inventory Management");
});
