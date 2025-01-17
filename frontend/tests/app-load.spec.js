import { test, expect } from "@playwright/test";

test("App loads on the correct URL", async ({ page }) => {
  await page.goto("http://localhost:8080");

  await expect(page).toHaveURL("http://localhost:8080/inventory");
});
