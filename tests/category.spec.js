import { test, expect } from "@playwright/test";

test("fiction category lists books", async ({ page }) => {
  await page.goto("/#/category/fiction");
  await expect(page.getByTestId("book-card").first()).toBeVisible();
});

test("add to cart updates the cart count", async ({ page }) => {
  await page.goto("/#/category/history");
  await page.getByRole("button", { name: "Add to cart" }).first().click();
  await expect(page.getByTestId("cart-count")).toHaveText("Cart (1)");
});
