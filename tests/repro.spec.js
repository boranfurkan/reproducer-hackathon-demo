import { test, expect } from "@playwright/test";

test.describe("reporter environment", () => {
  test.use({
    locale: "en-US",
    timezoneId: "America/New_York",
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    hasTouch: false,
    isMobile: false,
    colorScheme: "light",
  });

  test("reserving a book confirms the chosen pickup day in America/New_York", async ({ page }) => {
    await page.goto("/#/reserve/1");
    await page.getByTestId("pickup-date").fill("2026-11-05");
    await page.getByTestId("reserve-button").click();
    await expect(page.getByTestId("confirmation")).toContainText("Thursday, November 5");
  });
});

test.describe("baseline environment", () => {
  test("reserving a book confirms the chosen pickup day with default options", async ({ page }) => {
    await page.goto("/#/reserve/1");
    await page.getByTestId("pickup-date").fill("2026-11-05");
    await page.getByTestId("reserve-button").click();
    await expect(page.getByTestId("confirmation")).toContainText("Thursday, November 5");
  });
});
