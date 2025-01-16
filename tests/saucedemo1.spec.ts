import { test, expect } from '@playwright/test';
import { LoginPage } from './pageObject/loginPage.spec';

test('purchase an item', async ({ page }) => {
    const baseUrl = process.env.URL || '';
    await page.goto(baseUrl);
    const login = new LoginPage(page);
    await login.login('standard_user', 'secret_sauce');
    const itemsContainer = await page.locator('#inventory_container .inventory_item').all();
    const randomIndex = Math.floor(Math.random() * itemsContainer.length);
    const randomItem = itemsContainer[randomIndex];
    const expectDescription = await randomItem.locator('.inventory_item_desc').innerText();
    const expectName = await randomItem.locator('.inventory_item_name').innerText();
    const expectPrice = await randomItem.locator('.inventory_item_price').innerText();
    console.log(`Description: ${expectDescription}`);
    console.log(`Name: ${expectName}`);
    console.log(`Price: ${expectPrice}`);
    await randomItem.locator('.btn_primary').click();
    await page.locator('.shopping_cart_link').click();

    expect(page.locator('.checkout_button')).toBeVisible();
    const resultDescription = await page.locator('#cart_contents_container .inventory_item_desc').innerText();
    const resultName = await page.locator('#cart_contents_container .inventory_item_name').innerText();
    const resultPrice = await page.locator('#cart_contents_container .inventory_item_price').innerText();
    expect(resultDescription).toBe(expectDescription);
    expect(resultName).toBe(expectName);
    expect(resultPrice).toBe(expectPrice);
    await page.locator('.checkout_button').click();

    await page.getByRole('textbox', {name: 'First Name'}).fill('John');
    await page.getByRole('textbox', {name: 'Last Name'}).fill('Doe');
    await page.getByRole('textbox', {name: 'Postal Code'}).fill('12345');
    await page.getByRole('button', {name: 'Continue'}).click();
    expect(page.locator('.summary_info')).toBeVisible();
    const resultTotal = await page.locator('.summary_subtotal_label').innerText();
    const resultTotalPrice = resultTotal.replace('Item total: ', '');
    expect(resultTotalPrice).toBe(expectPrice);  
    await page.locator('.cart_button').click();  
    expect(page.locator('.complete-header')).toBeVisible(); 
    const resultMessage = await page.locator('.complete-header').innerText();
    expect(resultMessage).toBe('Thank you for your order!');  
});