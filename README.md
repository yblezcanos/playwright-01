# playwright-01
## Creating a Playwright Project-s

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
```sh
npx playwright test path/to/test-file.spec.ts -g [test name] --repeat-each [number of times]
```
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
## Taking Screenshots

Playwright provides a straightforward way to capture screenshots of your web pages during test execution. This can be useful for debugging and visual validation.

### Capturing a Full Page Screenshot

To capture a screenshot of the entire page, use the `screenshot` method on the `Page` object with the `fullPage` option set to `true`:

```typescript
// screenshot.spec.ts
import { test } from '@playwright/test';

test('should take a full page screenshot', async ({ page }) => {
    await page.goto('https://example.com');
    await page.screenshot({ path: 'fullpage.png', fullPage: true });
});
```

### Capturing a Screenshot of an Element

To capture a screenshot of a specific element, use the `screenshot` method on the `ElementHandle` object:

```typescript
// element-screenshot.spec.ts
import { test } from '@playwright/test';

test('should take a screenshot of an element', async ({ page }) => {
    await page.goto('https://example.com');
    const element = await page.$('#elementId');
    await element.screenshot({ path: 'element.png' });
});
```

### Capturing a Screenshot on Test Failure

You can also configure Playwright to automatically capture a screenshot when a test fails. This can be done in the Playwright configuration file:

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
    use: {
        screenshot: 'only-on-failure',
    },
    // other configurations
});
```

By using these methods, you can easily capture screenshots during your tests, helping you to debug issues and verify the visual appearance of your web pages.
## Using Interceptors to Block Images and CSS

Playwright allows you to intercept network requests and modify them as needed. This can be useful for blocking certain types of resources, such as images and CSS files, to speed up your tests or reduce unnecessary network traffic.

### Blocking Images and CSS

To block images and CSS files, you can use the `route` method to intercept network requests and abort those that match specific patterns. Here's an example of how to do this:

```typescript
// block-resources.spec.ts
import { test } from '@playwright/test';

test('should block images and CSS', async ({ page }) => {
    await page.route('**/*.{png,jpg,jpeg,gif,css}', route => route.abort());
    await page.goto('https://example.com');
    // Perform your test actions here
});
```

In this example, the `route` method is used to intercept all network requests that match the specified patterns (images and CSS files) and abort them. This prevents these resources from being loaded, which can speed up your tests.

### Using a Helper Function

You can also create a helper function to block resources and reuse it across multiple tests:

```typescript
// helpers.ts
import { Page } from '@playwright/test';

export async function blockResources(page: Page) {
    await page.route('**/*.{png,jpg,jpeg,gif,css}', route => route.abort());
}

// block-resources.spec.ts
import { test } from '@playwright/test';
import { blockResources } from './helpers';

test('should block images and CSS', async ({ page }) => {
    await blockResources(page);
    await page.goto('https://example.com');
    // Perform your test actions here
});
```

By using interceptors to block images and CSS files, you can optimize your test execution and focus on the critical aspects of your web application.
### Modifying API Responses

In addition to blocking resources, Playwright allows you to modify the responses of network requests. This can be useful for testing how your application behaves with different API responses.

To modify the response of an API call, you can use the `route` method to intercept the request and then use the `fulfill` method to provide a custom response. Here's an example of how to do this:

```typescript
// modify-api-response.spec.ts
import { test } from '@playwright/test';

test('should modify API response', async ({ page }) => {
    await page.route('**/api/data', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ key: 'modified value' }),
        });
    });
    await page.goto('https://example.com');
    // Perform your test actions here
});
```

In this example, the `route` method is used to intercept the network request to the specified API endpoint. The `fulfill` method is then used to provide a custom response with a modified JSON body.

### Using a Helper Function

You can also create a helper function to modify API responses and reuse it across multiple tests:

```typescript
// helpers.ts
import { Page } from '@playwright/test';

export async function modifyApiResponse(page: Page, url: string, response: any) {
    await page.route(url, route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(response),
        });
    });
}

// modify-api-response.spec.ts
import { test } from '@playwright/test';
import { modifyApiResponse } from './helpers';

test('should modify API response', async ({ page }) => {
    await modifyApiResponse(page, '**/api/data', { key: 'modified value' });
    await page.goto('https://example.com');
    // Perform your test actions here
});
```

By using interceptors to modify API responses, you can test different scenarios and ensure your application handles various API responses correctly.
## Modifying Book List on demoqa.com

Imagine the web page `https://demoqa.com/books` displays a grid with a list of books fetched from an API. You can modify this list to show only one book using Playwright's request interception and response modification capabilities.

### Example: Modifying Book List

Here's an example of how to intercept the API call and modify the response to show only one book:

```typescript
// modify-book-list.spec.ts
import { test } from '@playwright/test';

test('should modify book list to show only one book', async ({ page }) => {
    await page.route('**/BookStore/v1/Books', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                books: [
                    {
                        isbn: '9781449325862',
                        title: 'Git Pocket Guide',
                        subTitle: 'A Working Introduction',
                        author: 'Richard E. Silverman',
                        publish_date: '2020-06-04T08:48:39.000Z',
                        publisher: 'O\'Reilly Media',
                        pages: 234,
                        description: 'This pocket guide is the perfect on-the-job companion to Git, the distributed version control system.',
                        website: 'http://chimera.labs.oreilly.com/books/1230000000561/index.html'
                    }
                ]
            }),
        });
    });
    await page.goto('https://demoqa.com/books');
    // Perform your test actions here
});
```

In this example, the `route` method intercepts the network request to the book list API endpoint. The `fulfill` method provides a custom response with a modified JSON body containing only one book. This way, the web page will display only the specified book in the grid.
## Handling Environment Variables in GitHub Actions

When using GitHub Actions, you may need to handle environment variables securely, especially if they contain sensitive information like API keys or passwords. Here's how you can manage environment variables in GitHub Actions to avoid errors due to local environment variables.

### Storing Secrets in GitHub

1. Go to your GitHub repository and click on the `Settings` tab.
2. In the left sidebar, click on `Secrets and variables` and then `Actions`.
3. Click on the `New repository secret` button.
4. Add your environment variables as secrets. For example, you can add `BASE_URL`, `USERNAME`, and `PASSWORD`.

### Using Secrets in GitHub Actions

Once you have added your secrets, you can use them in your GitHub Actions workflow. Here's an example of how to set up a workflow that uses these secrets:

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on: [push, pull_request]

jobs:
    test:
        runs-on: ubuntu-latest

        steps:
        - name: Checkout repository
            uses: actions/checkout@v2

        - name: Set up Node.js
            uses: actions/setup-node@v2
            with:
                node-version: '14'

        - name: Install dependencies
            run: npm install

        - name: Run Playwright tests
            env:
                BASE_URL: ${{ secrets.BASE_URL }}
                USERNAME: ${{ secrets.USERNAME }}
                PASSWORD: ${{ secrets.PASSWORD }}
            run: npx playwright test
```

In this example, the `env` section under the `Run Playwright tests` step sets the environment variables using the secrets you added to your repository. This ensures that your tests have access to the necessary environment variables without exposing them in your code.

By following these steps, you can securely manage environment variables in GitHub Actions and avoid errors related to local environment variables.

### Handling Public Environment Variables in GitHub Actions

In addition to sensitive environment variables, you may also have public environment variables, such as a base URL, that you want to reuse across your GitHub Actions workflows. These variables can be stored in the `Variables` section instead of `Secrets`.

### Storing Variables in GitHub

1. Go to your GitHub repository and click on the `Settings` tab.
2. In the left sidebar, click on `Secrets and variables` and then `Actions`.
3. Click on the `New repository variable` button.
4. Add your environment variables. For example, you can add `PUBLIC_BASE_URL`.

### Using Variables in GitHub Actions

Once you have added your variables, you can use them in your GitHub Actions workflow. Here's an example of how to set up a workflow that uses these variables:

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on: [push, pull_request]

jobs:
    test:
        runs-on: ubuntu-latest

        steps:
        - name: Checkout repository
            uses: actions/checkout@v2

        - name: Set up Node.js
            uses: actions/setup-node@v2
            with:
                node-version: '14'

        - name: Install dependencies
            run: npm install

        - name: Run Playwright tests
            env:
                BASE_URL: ${{ vars.PUBLIC_BASE_URL }}
                USERNAME: ${{ secrets.USERNAME }}
                PASSWORD: ${{ secrets.PASSWORD }}
            run: npx playwright test
```

In this example, the `env` section under the `Run Playwright tests` step sets the `BASE_URL` environment variable using the public variable you added to your repository. This allows you to reuse the base URL across your workflows without exposing it as a secret.

By following these steps, you can manage both sensitive and public environment variables in GitHub Actions, ensuring your workflows are secure and maintainable.

## CI/CD with Jenkins and Playwright using Docker
- [CI/CD with Jenkins and Playwright using Docker](./docs/jenkins-playwright-docker.md)
### Configuring Content Security Policy (CSP) in Jenkins for html reports
- [Securely Configuring Content Security Policy (CSP) in Jenkins](./docs/secure-csp-jenkins.md)

The end

