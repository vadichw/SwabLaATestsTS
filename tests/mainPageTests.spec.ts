import { test, expect } from '@playwright/test';
import { LoginPage } from './loginPage';
import { MainPage } from './mainPage';
import { CartPage } from './cartPage';
import { OrdersPage } from './ordersPage';

test('Make an order', async ({ page }) => {
    const mainPage = new MainPage(page);
    const loginPage = new LoginPage(page);
    const cartPage = new CartPage(page);
    const ordersPage = new OrdersPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");

    await mainPage.addItemToCard();

    const actualNameItem = await mainPage.getActualNameItem();
    const actualPriceItem = await mainPage.getActualPriceItem();

    await cartPage.gotoCart();

    await cartPage.assertNameAndPriceItem(actualNameItem, actualPriceItem);
    await cartPage.clickCheckoutButton();

    await ordersPage.fillDataForOrder("FirstName", "LastName", "123456");
    await ordersPage.clickContinue();

    await ordersPage.assertItemsInOrder(actualNameItem, actualPriceItem);

    await ordersPage.checkPriceItemWithTax(actualPriceItem);
    await ordersPage.finishOrder("Thank you for your order!");
    await ordersPage.backToHomePage("https://www.saucedemo.com/inventory.html");
});


