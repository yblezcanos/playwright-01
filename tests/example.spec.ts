import { test, expect } from '@playwright/test';

test.use({storageState: {cookies:[], origins:[]}})
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