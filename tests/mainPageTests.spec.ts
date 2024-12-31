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

    // Добавление товара в корзину
    await mainPage.addItemToCard();

    // Получение данных о товаре
    const actualNameItem = await mainPage.getActualNameItem();
    const actualPriceItem = await mainPage.getActualPriceItem();

    // Переход в корзину
    await cartPage.goto();

    // Проверка данных в корзине
    await cartPage.assertNameAndPriceItem(actualNameItem, actualPriceItem);
});


