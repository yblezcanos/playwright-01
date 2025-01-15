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
