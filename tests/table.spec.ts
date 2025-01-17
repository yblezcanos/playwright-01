import { test, expect } from '@playwright/test';
import { TablePage } from './pageobject/TablePage';

test.describe('Working with table using POM', () => {
    let tablePage: TablePage;
  
    test.beforeEach(async ({ page }) => {
      tablePage = new TablePage(page);
      await tablePage.navigateTo();
    });
  
    test('should correctly extract table data and filter countries', async () => {
      const countries = await tablePage.getCountries();
      console.log('Total countries:', countries.length);
      console.log('Countries:', countries);
  
      const portugueseSpeakingCountries = await tablePage.getCountriesByLanguage('Portuguese');
      console.log('Portuguese speaking countries:', portugueseSpeakingCountries);
  
      // Realizar alguna aserción
      expect(portugueseSpeakingCountries.length).toBeGreaterThan(0);
    });
  });
// In this example, we have a test suite that navigates to a web page with a table and extracts data from it. The test suite is divided into two tests: one that extracts all the data from the table and another that filters the countries by language. The test suite uses a Page Object Model (POM) class called TablePage to interact with the table and extract the data. This approach makes the test suite more maintainable and readable by encapsulating the logic related to the table in a separate class.