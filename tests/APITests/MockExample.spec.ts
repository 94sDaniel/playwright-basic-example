import { test, expect } from '@playwright/test';

test("Do a validation with a fruit came from API ", async ({ page }) => {
    await page.goto('https://demo.playwright.dev/api-mocking');
 
    await expect(page.getByText('Strawberry')).toBeVisible();
});

test("Do a mock with a fruit that dont came from API ", async ({ page }) => {
    await page.route('*/**/api/v1/fruits', async route => {
        const json = [{ name: 'Melocotón', id: 26 }];
        await route.fulfill({ json });
    });
    await page.goto('https://demo.playwright.dev/api-mocking');
 
    await expect(page.getByText('Melocotón')).toBeVisible();
});

test('Get a real answer and put a not real answer', async ({ page }) => {

    await page.route('*/**/api/v1/fruits', async route => {
        const response = await route.fetch();
        const json = await response.json();
        json.push({ name: 'Lionel Messi', id: 200 });
        await route.fulfill({ response, json });
    });
 
    await page.goto('https://demo.playwright.dev/api-mocking');
 
    await expect(page.getByText('Lionel Messi', { exact: true })).toBeVisible();
});