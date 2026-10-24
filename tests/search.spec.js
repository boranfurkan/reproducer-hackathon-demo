import { test, expect } from "@playwright/test";

test("search finds a book whatever the capitals", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("search-input").fill("SILK ROAD");
  await expect(page.getByTestId("search-result").first()).toContainText("The Silk Road Ledger");
});

test("search says so when nothing matches", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("search-input").fill("zzzz");
  await expect(page.getByTestId("search-empty")).toBeVisible();
});
