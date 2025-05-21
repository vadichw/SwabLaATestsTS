import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pageObjects/loginPage';
import { MainPage } from '../pageObjects/mainPage';
import { OrdersPage } from '../pageObjects/ordersPage';
import { CartPage } from '../pageObjects/cartPage';

type PageObjects = {
  loginPage: LoginPage;
  mainPage: MainPage;
  ordersPage: OrdersPage;
  cartPage: CartPage;
};

export const test = baseTest.extend<PageObjects>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  ordersPage: async ({ page }, use) => {
    await use(new OrdersPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

});

export { expect } from '@playwright/test';



