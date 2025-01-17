import { test, expect } from "@playwright/test";

test.describe("Tab navigation and route verification", () => {
  test("Inventory tab loads the correct component", async ({ page }) => {
    await page.goto("http://localhost:8080");

    await page.click("text=Inventory");
    await expect(page).toHaveURL(/\/inventory/);

    const inventoryHeading = page.locator('h1:has-text("All Inventory")');
    await expect(inventoryHeading).toBeVisible();
  });

  test("Low Stock tab loads the correct component", async ({ page }) => {
    await page.goto("http://localhost:8080");

    await page.click("text=Low Stock");
    await expect(page).toHaveURL(/\/lowstock/);

    const lowStockHeading = page.locator('h2:has-text("Low Stock Products")');
    await expect(lowStockHeading).toBeVisible();
  });

  test("Category Insights tab loads the correct component", async ({
    page,
  }) => {
    await page.goto("http://localhost:8080");

    await page.click("text=Category Insights");
    await expect(page).toHaveURL(/\/categoryinsights/);

    const categoryInsightsHeading = page.locator(
      'h1:has-text("Category-Based Stock Insights")'
    );
    await expect(categoryInsightsHeading).toBeVisible();
  });
});
