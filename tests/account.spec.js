import { expect, test } from "@playwright/test";

test("an order opens in the drawer and the drawer closes again", async ({ page }) => {
  await page.goto("/apps/account/");
  await expect(page.getByTestId("order-row")).toHaveCount(3);
  await page.getByTestId("view-PF-1042").click();
  await expect(page.getByTestId("drawer")).toContainText("PF-1042");
  await page.getByTestId("close-drawer").click();
  await expect(page.getByTestId("drawer")).toHaveCount(0);
  await page.getByTestId("view-PF-1057").click();
  await expect(page.getByTestId("drawer")).toContainText("PF-1057");
});
