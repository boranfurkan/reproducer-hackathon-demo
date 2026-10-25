import { expect, test } from "@playwright/test";

test("paying places the order and shows the confirmation", async ({ page }) => {
  await page.goto("/apps/checkout/");
  await page.getByTestId("email").fill("reader@example.com");
  await page.getByTestId("pay").click();
  await expect(page.getByTestId("confirmation")).toContainText("Order confirmed");
});

test("an invalid email is refused", async ({ page }) => {
  await page.goto("/apps/checkout/");
  await page.getByTestId("email").fill("not-an-email");
  await page.getByTestId("pay").click();
  await expect(page.getByTestId("message")).toContainText("valid email");
});
