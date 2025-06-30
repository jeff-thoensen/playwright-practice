require('dotenv').config();
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/loginPage');


async function login(page) {
  await page.goto('/login');
  await page.locator('#username').fill(process.env.LOGIN_USER);
  await page.locator('#password').fill(process.env.LOGIN_PASS);
  await page.locator('button[type="submit"]').click();
}
test('login page loads', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('h2')).toHaveText('Login Page');
});

test('invalid login shows error message', async ({ page }) => {
  await page.goto('/login');
  await page.locator('#username').fill('wronguser');
  await page.locator('#password').fill('wrongpass');
  await page.locator('button[type="submit"]').click();
  await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});

test('valid login succeeds and redirects', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.LOGIN_USER, process.env.LOGIN_PASS);

  await expect(loginPage.flashMessage).toContainText('You logged into a secure area!');
  await expect(page).toHaveURL(/secure/);
});

test('logout after successful login', async ({ page }) => {
  await login(page); // using helper

  await page.click('a[href="/logout"]');
  await expect(page).toHaveURL(/login/);
  await expect(page.locator('h2')).toHaveText('Login Page');
});

test('file upload works', async ({ page }) => {
  await page.goto('/upload');

  await page.setInputFiles('#file-upload', 'tests/test-files/example.txt');

  await page.locator('input[type="submit"]').click();

  await expect(page.locator('#uploaded-files')).toHaveText('example.txt');
});

