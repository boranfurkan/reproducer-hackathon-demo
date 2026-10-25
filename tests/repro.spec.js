import { expect, test } from "@playwright/test";

test.describe("reporter environment with Chrome Translate", () => {
  test.use({"locale":"de-DE","timezoneId":"Europe/Berlin","viewport":{"width":1536,"height":864},"deviceScaleFactor":1.25,"hasTouch":false,"isMobile":false});

  test.beforeEach(async ({ context }) => { await context.addInitScript("(() => {\n  const wrap = (node) => {\n    const text = node.nodeValue;\n    const parent = node.parentNode;\n    if (!text || !text.trim() || !parent || ['SCRIPT', 'STYLE', 'FONT'].includes(parent.nodeName)) return;\n    if (parent.closest && parent.closest('[translate=\"no\"], .notranslate')) return;\n    const outer = document.createElement('font');\n    outer.style.verticalAlign = 'inherit';\n    const inner = document.createElement('font');\n    inner.style.verticalAlign = 'inherit';\n    inner.textContent = text;\n    outer.appendChild(inner);\n    parent.replaceChild(outer, node);\n  };\n  const walk = (root) => {\n    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);\n    const nodes = [];\n    while (walker.nextNode()) nodes.push(walker.currentNode);\n    nodes.forEach(wrap);\n  };\n  const start = () => {\n    walk(document.body);\n    new MutationObserver((records) => {\n      for (const r of records) for (const n of r.addedNodes) { if (n.nodeType === 3) wrap(n); else if (n.nodeType === 1) walk(n); }\n    }).observe(document.body, { childList: true, subtree: true });\n  };\n  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();\n})();"); });

  test("removing a book from the basket keeps the storefront visible", async ({ page }) => {
    await page.goto("/apps/storefront/");
    await expect(page.locator('[data-testid="book-card"]')).toHaveCount(6);
    await page.locator('[data-testid="add-1"]').click();
    await expect(page.locator('[data-testid="remove-1"]')).toBeVisible();
    await page.locator('[data-testid="remove-1"]').click();
    await expect(page.locator('[data-testid="basket-line"]')).toBeHidden();
    await expect(page.locator('[data-testid="book-grid"]')).toBeVisible();
    await expect(page.locator('[data-testid="book-card"]')).toHaveCount(6);
  });
});

test.describe("baseline environment", () => {
  test("removing a book from the basket keeps the storefront visible", async ({ page }) => {
    await page.goto("/apps/storefront/");
    await expect(page.locator('[data-testid="book-card"]')).toHaveCount(6);
    await page.locator('[data-testid="add-1"]').click();
    await expect(page.locator('[data-testid="remove-1"]')).toBeVisible();
    await page.locator('[data-testid="remove-1"]').click();
    await expect(page.locator('[data-testid="basket-line"]')).toBeHidden();
    await expect(page.locator('[data-testid="book-grid"]')).toBeVisible();
    await expect(page.locator('[data-testid="book-card"]')).toHaveCount(6);
  });
});
