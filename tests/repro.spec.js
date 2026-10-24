import { test, expect } from "@playwright/test";

test.describe("reporter environment (tr-TR)", () => {
  test.use({
    locale: "tr-TR",
    timezoneId: "Europe/Istanbul",
    viewport: { width: 412, height: 1004 },
    deviceScaleFactor: 2.625,
    hasTouch: true,
    isMobile: true,
  });

  test("opening fiction category from home page lists books", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("category-fiction").click();
    await expect(page.getByTestId("book-card").first()).toBeVisible();
  });
});

test.describe("default environment", () => {
  test("opening fiction category from home page lists books", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("category-fiction").click();
    await expect(page.getByTestId("book-card").first()).toBeVisible();
  });
});
