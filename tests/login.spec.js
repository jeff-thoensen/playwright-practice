require('dotenv').config();
const { test, expect } = require('@playwright/test');

async function login(page) {
  await page.goto('/login');
  await page.locator('#username').fill(process.env.LOGIN_USER);
  await page.locator('#password').fill(process.env.LOGIN_PASS);
  await page.locator('button[type="submit"]').click();
}

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

test('successful login', async ({ page }) => {
  await page.goto('/login');
  await page.locator('#username').fill(process.env.LOGIN_USER);
  await page.locator('#password').fill(process.env.LOGIN_PASS);
  await page.locator('button[type="submit"]').click();
  await expect(page.locator('.flash.success')).toBeVisible();
  await expect(page).toHaveURL(/secure/);
});
