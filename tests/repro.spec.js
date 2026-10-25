import { expect, test } from "@playwright/test";

test.describe("Europe/London timezone during DST fall-back", () => {
  test.use({
    locale: "en-US",
    timezoneId: "Europe/London",
    viewport: { width: 1536, height: 864 },
    deviceScaleFactor: 1.25,
    hasTouch: false,
    isMobile: false,
  });

  test("renders all 6 sessions of the Midnight Reading Marathon and allows booking", async ({ page }) => {
    await page.goto("/apps/events/?date=2026-10-25");
    await expect(page.getByTestId("sessions")).toBeVisible();
    await expect(page.getByTestId("session")).toHaveCount(6);
    await page.getByTestId("session").nth(1).click();
    await page.getByTestId("name").fill("Alex");
    await page.getByTestId("book").click();
    await expect(page.getByTestId("result")).toContainText("Booked for");
  });
});

test.describe("default environment", () => {
  test("renders all 6 sessions of the Midnight Reading Marathon and allows booking", async ({ page }) => {
    await page.goto("/apps/events/?date=2026-10-25");
    await expect(page.getByTestId("sessions")).toBeVisible();
    await expect(page.getByTestId("session")).toHaveCount(6);
    await page.getByTestId("session").nth(1).click();
    await page.getByTestId("name").fill("Alex");
    await page.getByTestId("book").click();
    await expect(page.getByTestId("result")).toContainText("Booked for");
  });
});
