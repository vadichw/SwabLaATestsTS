import { users } from '../usersCollection';
import { test } from '../fixtures/customFixtures'; 

test('Make an order', async ({ loginPage, mainPage, cartPage, ordersPage }) => {

    await loginPage.goto();
    await loginPage.login(users.standard.login, users.standard.password);

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

test("Remove item from cart", async ({ loginPage, mainPage, }) => {

    await loginPage.goto();
    await loginPage.login(users.standard.login, users.standard.password);

    await mainPage.addItemToCard();
    await mainPage.checkItemIsIAdded();

    await mainPage.removeFromCart();
    await mainPage.checkPresentingItemInCart();

})


