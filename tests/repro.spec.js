import { test, expect } from "@playwright/test";

test.describe("reporter environment (tr-TR mobile)", () => {
  test.use({
    locale: "tr-TR",
    timezoneId: "Europe/Istanbul",
    viewport: { width: 412, height: 915 },
    deviceScaleFactor: 2.625,
    hasTouch: true,
    isMobile: true,
  });

  test("fiction category lists books", async ({ page }) => {
    await page.goto("/#/category/fiction");
    await expect(page.getByTestId("book-card").first()).toBeVisible();
  });
});

test.describe("default environment", () => {
  test("fiction category lists books", async ({ page }) => {
    await page.goto("/#/category/fiction");
    await expect(page.getByTestId("book-card").first()).toBeVisible();
  });
});
