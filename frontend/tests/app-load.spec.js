import { test, expect } from "@playwright/test";

test("App loads on the correct URL", async ({ page }) => {
  // Navigate to the root URL
  await page.goto("http://localhost:8080");

  // Verify the URL is correct
  await expect(page).toHaveURL("http://localhost:8080/inventory");
});
