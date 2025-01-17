import { Page, Locator } from '@playwright/test';

interface Country {
  name: string;
  capital: string;
  currency: string;
  primaryLanguage: string;
}

export class TablePage {
  private page: Page;
  private table: Locator;

  constructor(page: Page) {
    this.page = page;
    this.table = page.locator('#countries');
  }

  // Navegar a la página
  async navigateTo(): Promise<void> {
    await this.page.goto('https://cosmocode.io/automation-practice-webtable/');
  }

  // Obtener todas las filas de la tabla
  async getRows(): Promise<Locator[]> {
    return await this.table.locator('tr').all();
  }

  // Extraer los datos de la tabla en formato de objetos Country
  async getCountries(): Promise<Country[]> {
    const rows = await this.getRows();
    const countries: Country[] = [];

    for (let i = 1; i < rows.length; i++) { // Ignorar encabezado (fila 0)
      const country: Country = {
        name: await rows[i].locator('td:nth-child(2)').innerText(),
        capital: await rows[i].locator('td:nth-child(3)').innerText(),
        currency: await rows[i].locator('td:nth-child(4)').innerText(),
        primaryLanguage: await rows[i].locator('td:nth-child(5)').innerText(),
      };
      countries.push(country);
    }

    return countries;
  }

  // Filtrar países por idioma
  async getCountriesByLanguage(language: string): Promise<Country[]> {
    const countries = await this.getCountries();
    return countries.filter(country => country.primaryLanguage.toLowerCase() === language.toLowerCase());
  }
}
