import { test as setup, expect } from "@playwright/test";
import { LoginPage } from './pageobject/loginPage';

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
    await page.goto('https://saucedemo.com')
    const login = new LoginPage(page)
    await login.login('standard_user', 'secret_sauce')

    //almacenar el estado de la sesion(es como una cookie)
    await page.context().storageState({path: authFile})

});