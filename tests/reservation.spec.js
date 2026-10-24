import { test, expect } from "@playwright/test";

test.use({ locale: "en-GB", timezoneId: "Europe/London" });

test("reserving a book confirms the pickup day", async ({ page }) => {
  await page.goto("/#/reserve/1");
  await page.getByTestId("pickup-date").fill("2026-11-05");
  await page.getByTestId("reserve-button").click();
  await expect(page.getByTestId("confirmation")).toContainText("5 November");
});

test("prices are shown in pounds by default", async ({ page }) => {
  await page.goto("/#/category/fiction");
  await expect(page.getByTestId("book-card").first()).toContainText("£");
});
