import { expect, test } from "@playwright/test";

test("a book can be added to the basket and removed again", async ({ page }) => {
  await page.goto("/apps/storefront/");
  await expect(page.getByTestId("book-card")).toHaveCount(6);
  await page.getByTestId("add-1").click();
  await expect(page.getByTestId("cart-summary")).toContainText("1 book");
  await page.getByTestId("add-3").click();
  await expect(page.getByTestId("cart-summary")).toContainText("2 books");
  await page.getByTestId("remove-1").click();
  await page.getByTestId("remove-3").click();
  await expect(page.getByTestId("basket")).toContainText("Your basket is empty");
  await expect(page.getByTestId("book-card")).toHaveCount(6);
});
