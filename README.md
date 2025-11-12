# playwright-basic-example
# Playwright Basic Example

This project is a basic framework demonstrating various Playwright features, including **End-to-End (E2E) testing**, **Page Object Model (POM)** usage, **API Mocking**, and **Multi-Browser/Device configuration**.

## 🚀 Getting Started

### Prerequisites

You need **Node.js** installed on your system to run this project.

### Installation

1.  **Clone the repository** (if applicable).
2.  **Install dependencies** using `npm`:

    ```bash
    npm install
    ```

    The primary dependencies, as seen in `package.json`, are **`@playwright/test`** and **`@types/node`**.

## ⚙️ Configuration Overview

The core settings for the test runner are defined in **`playwright.config.ts`**.

### `playwright.config.ts` Specifications

| Setting | Value | Description | Source |
| :--- | :--- | :--- | :--- |
| **`testDir`** | `./tests` | Specifies that all test files are located in the `tests` directory. | `playwright.config.ts` |
| **`fullyParallel`** | `true` | Allows tests to run in parallel for faster execution. | `playwright.config.ts` |
| **`retries`** | `process.env.CI ? 2 : 0` | Tests will be retried twice only when running in a Continuous Integration (CI) environment. | `playwright.config.ts` |
| **`workers`** | `process.env.CI ? 1 : undefined` | Limits parallel workers to 1 in CI environments, but uses the default (auto-detected) number of workers locally. | `playwright.config.ts` |
| **`reporter`** | `'html'` | The test results will be reported using the interactive HTML reporter. | `playwright.config.ts` |
| **`trace`** (in `use` block) | `'on'` | A trace is collected for every test, allowing for detailed debugging and analysis in the Playwright Trace Viewer. | `playwright.config.ts` |

***

## 🌐 Test Projects and Environments

The **`playwright.config.ts`** file defines multiple projects to target different browsers, devices, and testing types.

### Standard E2E Projects

These projects are configured for desktop browsers:

* **`chromium`**: Runs tests in **Google Chrome** or **Chromium**.
* **`firefox`**: Runs tests in **Mozilla Firefox**.
* **`webkit`**: Runs tests in **Webkit** (similar to Safari).

### Mobile and API Projects

| Project Name | Test Match Pattern | Configuration Details | Environment/Usage | Source |
| :--- | :--- | :--- | :--- | :--- |
| **`Iphone`** | `/AutomationSandbox.spec.ts` | Uses **`devices['iPhone 15 Pro Max']`** for mobile viewport emulation. Has an explicit retry count of `2`. | Runs tests against the `AutomationSandbox` file specifically on a mobile viewport. | `playwright.config.ts` |
| **`API Tests`** | `APITests/**/*` | Sets **`baseURL`** to `https://api.github.com`. Requires a custom HTTP header for authorization. | Designed for testing REST APIs. | `playwright.config.ts` |

### Environment Configuration: API Tests

The `API Tests` project requires an environment variable for authentication, as configured in the `extraHTTPHeaders`:

| Variable | Usage | File Example |
| :--- | :--- | :--- |
| **`GITHUB_TOKEN`** | Used in the `Authorization` header as a Bearer token. | `Authorization: \`Bearer ${process.env.GITHUB_TOKEN}\`` |

You must set the `GITHUB_TOKEN` environment variable before running the API tests.

## 📁 Project Structure and Files

| File/Directory | Purpose | Key Feature Demonstrated |
| :--- | :--- | :--- |
| **`tests/AutomationSandBox.spec.ts`** | Contains various E2E tests for form elements, buttons, tables, and dropdowns on a sandbox site. | **Test Annotations** (`test.info().annotations`) and **Test Tags** (`@Sandbox`). |
| **`tests/pages/SandboxPage.ts`** | Implements the **Page Object Model** for the sandbox page elements and actions. | Demonstrates separating test logic from page interaction logic. |
| **`tests/APITests/MockExample.spec.ts`** | Shows how to intercept and modify network requests. | **API Mocking** using `page.route` to return fake data or modify real responses. |
| **`tests/test-1.spec.ts`** | Tests navigation and title validation for a multi-page site. | **Data-driven tests** using a `for...of` loop. |
| **`tests-examples/demo-todo-app.spec.ts`** | A comprehensive example for a TodoMVC application. | Extensive use of **`test.describe`**, **`test.beforeEach/afterEach`**, and **Storage/Persistence testing**. |

## ▶️ How to Run Tests

### General Commands

| Command | Description |
| :--- | :--- |
| **`npx playwright test`** | Run tests against all configured projects (**chromium, firefox, webkit, Iphone, API Tests**). |
| **`npx playwright test --project=chromium`** | Run tests only in the **Chromium** browser. |
| **`npx playwright show-report`** | Open the generated HTML report. |

### Running Specific Tests

| Scenario | Command | File Example |
| :--- | :--- | :--- |
| **Run only API tests** | `npx playwright test --project="API Tests"` | `APITests/MockExample.spec.ts` |
| **Run only tests with a specific tag** | `npx playwright test --grep @Sandbox` | Targets a test in `AutomationSandBox.spec.ts` |
| **Run a test by filename** | `npx playwright test tests/AutomationSandBox.spec.ts` | Runs all tests in the sandbox file |
| **Skip a test** | Use `test.skip()` annotation in the test file. | Example in `tests/AutomationSandBox.spec.ts` |
| **Run only a single test** | Use `test.only()` annotation in the test file. | N/A (Only is forbidden in CI) |