# playwright-01
## Creating a Playwright Project

To create a new Playwright project, you can use the following command:

```sh
npm init playwright@latest
```

This command initializes a new Playwright project with the latest version. It sets up the necessary configuration files, installs Playwright dependencies, and provides you with a basic project structure to get started with end-to-end testing.  

During the initialization process, you will be prompted to configure several options for your project. These configurations include:

**TypeScript or JavaScript:** Choose whether to use TypeScript or JavaScript for your project.

**E2E Testing with Playwright Test:** Decide if you want to set up end-to-end testing using Playwright Test.

**GitHub Actions:** Option to add GitHub Actions workflow for continuous integration.

**Browser Selection:** Select which browsers (Chromium, Firefox, WebKit) you want to install and use for testing.

**Base URL:** Option to specify a base URL for your tests.

**Example Tests:** Option to include example tests to help you get started.

These configurations help tailor the Playwright setup to your specific needs and streamline the process of getting started with end-to-end testing.


## Running Tests

Once your Playwright project is set up, you can run your tests using the following command:

```sh
npx playwright test
```

This command executes all the tests in your project. You can also specify a particular test file or directory to run specific tests:

```sh
npx playwright test path/to/test-file.spec.ts
```

Additionally, you can use various options to customize the test run, such as running tests in a specific browser, enabling headless mode, or generating a report:

```sh
npx playwright test --browser=firefox --headless --reporter=html
```

These options provide flexibility in how you run your tests, allowing you to tailor the execution to your specific requirements.

## Viewing Test Reports

After running your tests, you can view the test reports in your browser. Playwright provides a convenient way to generate and view these reports using the following command:

```sh
npx playwright show-report
```

This command opens the test report in your default web browser, allowing you to see detailed information about the test run, including passed and failed tests, error messages, and execution times. This visual representation helps you quickly identify and address any issues in your tests.

## Viewing Test Execution in the Browser

To view the execution of your tests in the browser, you can disable headless mode. By default, Playwright runs tests in headless mode, which means the browser window is not displayed. To see the browser window during test execution, use the `--headed` option:

```sh
```sh
npx playwright test --headed
```
## Playwright Test Runner UI

Playwright also provides a graphical user interface (UI) for running and debugging tests. This UI makes it easier to visualize and interact with your tests. To start the Playwright Test Runner UI, use the following command:

```sh
npx playwright test --ui
```

This command opens the Playwright Test Runner UI in your default web browser. The UI allows you to:

- Run all tests or individual tests.
- Filter tests by status (e.g., passed, failed).
- View detailed test results and error messages.
- Debug tests by stepping through the code and inspecting the browser state.

The Playwright Test Runner UI is a powerful tool for developing and debugging your tests, providing a more interactive and visual approach to test execution.
## Creating and Using a Page Object

A Page Object is a design pattern that helps you create an abstraction layer over the UI of your application. This pattern makes your tests more readable, maintainable, and reusable by encapsulating the page structure and interactions in a separate class.

### Creating a Page Object

To create a Page Object, you need to define a class that represents a page or a component of your application. This class should contain methods that interact with the elements on the page. Here's an example of a simple Page Object for a login page:

```typescript
// loginPage.ts
import { Page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto('https://example.com/login');
    }

    async login(username: string, password: string) {
        await this.page.fill('#username', username);
        await this.page.fill('#password', password);
        await this.page.click('#loginButton');
    }

    async getErrorMessage() {
        return this.page.textContent('#errorMessage');
    }
}
```

### Using a Page Object

Once you have defined your Page Object, you can use it in your tests to interact with the page. Here's an example of how to use the `LoginPage` class in a test:

```typescript
// login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './loginPage';

test('should display an error message for invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('invalidUser', 'invalidPassword');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Invalid username or password.');
});
```

In this example, the `LoginPage` class is used to navigate to the login page, perform a login action, and retrieve the error message. This approach makes the test more readable and easier to maintain by abstracting the page interactions into a separate class.
## Installing and Using dotenv

`dotenv` is a module that loads environment variables from a `.env` file into `process.env`. This is useful for managing configuration settings and sensitive information like API keys and passwords.

### Installing dotenv

To install `dotenv`, use the following command:

```sh
npm i dotenv --save-dev
```

### Using dotenv

To use `dotenv` in your Playwright project, follow these steps:

1. Create a `.env` file in the root of your project and add your environment variables:

    ```env
    BASE_URL=https://example.com
    USERNAME=your-username
    PASSWORD=your-password
    ```

2. Load the environment variables at the beginning of your test files or in a setup file:

    ```typescript
    // setup.ts
    import dotenv from 'dotenv';

    dotenv.config();
    ```

3. Access the environment variables in your tests:

    ```typescript
    // login.spec.ts
    import { test, expect } from '@playwright/test';
    import { LoginPage } from './loginPage';

    test('should display an error message for invalid login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(process.env.USERNAME, process.env.PASSWORD);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toBe('Invalid username or password.');
    });
    ```

By using `dotenv`, you can keep your configuration settings and sensitive information separate from your code, making your project more secure and easier to manage.

## Global Setup for dotenv

Instead of importing `dotenv` in each test file, you can set up a global configuration file that loads the environment variables once for all your tests.

### Creating a Global Setup File

1. Create a global setup file, for example, `global-setup.ts` in the root of your project:

    ```typescript
    import { FullConfig } from '@playwright/test';
    import dotenv from 'dotenv';

    async function globalSetup(config: FullConfig) {
        dotenv.config();
    }

    export default globalSetup;
    ```

2. Update your Playwright configuration file (`playwright.config.ts`) to use the global setup file:

    ```typescript
    import { defineConfig } from '@playwright/test';

    export default defineConfig({
        globalSetup: require.resolve('./global-setup'),
        // other configurations
    });
    ```

By using a global setup file, you only need to load the environment variables once, and they will be available in all your test files without needing to import `dotenv` in each one.

## Windows Environment Vars
- setx /m NODE_ENV dev 
- echo %NODE_ENV%
- echo %PATH%