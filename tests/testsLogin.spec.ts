import { test, expect } from '@playwright/test';
import { LoginPage } from './loginPage';
import { MainPage } from './mainPage';
import { getLoginData } from '../utils';

test('login with valid data', async ({ page, request }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);

  const loginData = getLoginData();

  await loginPage.goto();
  await loginPage.login(loginData.email, loginData.password);
  await mainPage.checkHeader("Products")
});

test('login with invalid username', async ({page, request}) => {
  const loginPage = new LoginPage(page);
  const expectedErrorText = "Epic sadface: Username and password do not match any user in this service";
  
  const loginData = getLoginData();

  await loginPage.goto();
  await loginPage.login("invalidName", loginData.password);
  await loginPage.checkErrorMsg(expectedErrorText);
})

