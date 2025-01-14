import { test, expect } from "@playwright/test";

test.describe("Tab navigation and route verification", () => {
  test("Inventory tab loads the correct component", async ({ page }) => {
    await page.goto("http://localhost:8080");

    // Click the "Inventory" tab and verify route
    await page.click("text=Inventory");
    await expect(page).toHaveURL(/\/inventory/);

    // Verify the inventory component is displayed
    const inventoryHeading = page.locator('h1:has-text("All Inventory")');
    await expect(inventoryHeading).toBeVisible();
  });

  test("Low Stock tab loads the correct component", async ({ page }) => {
    await page.goto("http://localhost:8080");

    // Click the "Low Stock" tab and verify route
    await page.click("text=Low Stock");
    await expect(page).toHaveURL(/\/lowstock/);

    // Verify the low stock component is displayed
    const lowStockHeading = page.locator('h2:has-text("Low Stock Products")');
    await expect(lowStockHeading).toBeVisible();
  });

  test("Category Insights tab loads the correct component", async ({
    page,
  }) => {
    await page.goto("http://localhost:8080");

    // Click the "Category Insights" tab and verify route
    await page.click("text=Category Insights");
    await expect(page).toHaveURL(/\/categoryinsights/);

    // Verify the category insights component is displayed
    const categoryInsightsHeading = page.locator(
      'h1:has-text("Category-Based Stock Insights")'
    );
    await expect(categoryInsightsHeading).toBeVisible();
  });
});
