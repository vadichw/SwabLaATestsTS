import { test, expect } from '@playwright/test';
import { LoginPage } from './loginPage';
import { MainPage } from './mainPage';

test('login with valid data', async ({ page, request }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);
  await loginPage.goto();
  await loginPage.fillDataInFields("standard_user", "secret_sauce");
  await loginPage.clickButtonLogin();

  const currentUrl = page.url();
  const response = await request.get(currentUrl);
  expect(response.status()).toBe(404); // 404 because if data is valid then status code 404, 
  // I don`t know why
  await mainPage.chechHeader("Products")
});

test('login with invalid username', async ({page, request}) => {
  const loginPage = new LoginPage(page);
  const expectedErrorText = "Epic sadface: Username and password do not match any user in this service";
  
  await loginPage.goto();
  await loginPage.fillDataInFields("invalidname", "secret_sauce");
  await loginPage.clickButtonLogin();
  await loginPage.checkErrorMsg(expectedErrorText);

  const currentUrl = page.url();
  const response = await request.get(currentUrl);
  expect(response.status()).toBe(200); // 200 because if data is invalid then status code 200, 
  // I don`t know why
})

