const { test, expect } = require('@playwright/test');

test('check login page loads', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('h2')).toHaveText('Login Page');
});

test('try invalid login', async ({ page }) => {
    await page.goto('/login');
    await page.locator('#username').fill('wronguser');
    await page.locator('#password').fill('wrongpass');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.flash.error')).toBeVisible();
  });