import { test, expect } from "@playwright/test";

test("Page contains the correct title and heading", async ({ page }) => {
  await page.goto("http://localhost:8080");

  await expect(page).toHaveTitle(/Real-Time Inventory Management/);

  const heading = page.locator("#main-heading");
  await expect(heading).toHaveText("Real-Time Product Inventory Management");
});
