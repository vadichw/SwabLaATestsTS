import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItemName: Locator;
    readonly cartItemPrice: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItemName = page.locator("//div[@class='cart_item']//div[@class='inventory_item_name']");
        this.cartItemPrice = page.locator("//div[@class='cart_item']//div[@class='inventory_item_price']");
        this.checkoutButton = page.locator("//button[@id='checkout']");

    }

    async gotoCart() {
        await this.page.click("//a[@class='shopping_cart_link']");
    }

    async assertNameAndPriceItem(expectedName: string, expectedPrice: string) {
        const actualName = (await this.cartItemName.textContent())?.trim() ?? "";
        const actualPrice = (await this.cartItemPrice.first().textContent())?.trim() ?? "";

        expect(actualName).toBe(expectedName);
        expect(actualPrice).toBe(expectedPrice);
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }


}