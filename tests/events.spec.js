import { expect, test } from "@playwright/test";

test("every session of the marathon can be booked", async ({ page }) => {
  await page.goto("/apps/events/?date=2026-10-25");
  await expect(page.getByTestId("session")).toHaveCount(6);
  await page.getByTestId("session").nth(2).click();
  await page.getByTestId("name").fill("Sam");
  await page.getByTestId("book").click();
  await expect(page.getByTestId("result")).toContainText("Booked");
});
