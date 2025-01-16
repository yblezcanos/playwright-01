import { test, expect } from '@playwright/test';

/*test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
*/
test('verifySearchFeature', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');
  await page.locator('input[id="cb1-edit"]').fill('Iphone');
  await page.keyboard.press('Enter');
  await expect(page.locator('ol.ui-search-layout')).toBeVisible();
  const titles = await page.locator('ol.ui-search-layout li h2').allInnerTexts();
  for (let title of titles) {
    console.log(`The title is: ${title}`);
  }
});

test('verifyMisComprasButton', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');
  await page.getByRole('link', { name: 'Mis compras' }).click();  
});

test('verifyIngresaButton', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');
  await page.getByRole('link', { name: 'Ingresa', exact: true}).click();  
});