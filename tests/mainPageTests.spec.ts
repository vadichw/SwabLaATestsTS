import { test, expect } from '@playwright/test';
import { LoginPage } from './loginPage';
import { MainPage } from './mainPage';

test('Add to card item', async ({page}) => {
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.fillDataInFields("standard_user", "secret_sauce");
    await loginPage.clickButtonLogin();

    await mainPage.addItemToCard();
});