import { test, expect } from '@playwright/test';

interface Country {
    name: string;
    capital: string;
    currency: string;
    primaryLanguage: string;
}

test.describe('Working with table', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://cosmocode.io/automation-practice-webtable/');
    });

    test('should have the correct table structure', async ({ page }) => {
        const table = await page.locator('#countries');
        const rows = await table.locator('tr').all();
        console.log('filas ' + rows.length);

        const countries: Country[] = [];
        for (let row of rows) {
            const country: Country = {
                name: await row.locator('td:nth-child(2)').innerText(),
                capital: await row.locator('td:nth-child(3)').innerText(),
                currency: await row.locator('td:nth-child(4)').innerText(),
                primaryLanguage: await row.locator('td:nth-child(5)').innerText(),
            };
            countries.push(country);
        }

        console.log('Countries length: ', countries.length);
        console.log('Countries: ', countries);
        console.log('-----------------------------------------');

        for (const country of countries) {
            console.log(country);          
        }
        const portugueseSpeakingCountries = countries.filter(country => country.primaryLanguage.toLowerCase() === 'portuguese');
        console.log('Portuguese speaking countries: ', portugueseSpeakingCountries);
    });
});