import { test, expect } from '@playwright/test';
import { LoginPage } from './loginPage';
import { MainPage } from './mainPage';
import { CartPage } from './cartPage';

test('Add to cart item', async ({ page }) => {
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");

    await mainPage.addItemToCard();

    const actualNameItem = await mainPage.getActualNameItem();
    const actualPriceItem = await mainPage.getActualPriceItem();

    await cartPage.gotoCart();

    await cartPage.assertNameAndPriceItem(actualNameItem, actualPriceItem);
});


