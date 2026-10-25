import { expect, test } from "@playwright/test";

test("the reading list loads, takes a new book and undoes it", async ({ page }) => {
  await page.goto("/apps/reader/");
  await expect(page.getByTestId("list-item")).toHaveCount(2);
  await page.getByTestId("title").fill("Letters from the Tideline");
  await page.getByTestId("add").click();
  await expect(page.getByTestId("list-item")).toHaveCount(3);
  await expect(page.getByTestId("latest")).toContainText("Letters from the Tideline");
  await page.getByTestId("undo").click();
  await expect(page.getByTestId("list-item")).toHaveCount(2);
});
