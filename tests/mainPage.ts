import { expect, type Locator, type Page } from '@playwright/test';

export class MainPage {
    readonly page: Page;
    readonly headerPage: Locator;
    readonly buttonAddToCard: Locator;
    readonly nameItem: Locator;
    readonly priceItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerPage = page.locator("//span[@data-test='title']");
        this.buttonAddToCard = page.locator("//button[@id='add-to-cart-sauce-labs-backpack']");
        this.nameItem = page.locator("//a[@id='item_4_title_link']");
        this.priceItem = page.locator("//div[@class='inventory_item_price']");
    }

    async chechHeader(expectedHeaderPage: string) {
        await this.headerPage.isVisible();
        const actualHeaderPage = await this.headerPage.textContent();
        expect(actualHeaderPage?.trim()).toBe(expectedHeaderPage);
    }

    async addItemToCard() {
        await this.buttonAddToCard.isVisible();
        await this.buttonAddToCard.click();
    }

    async getActualNameItem(): Promise<string> {
        const name = await this.nameItem.first().textContent();
        return name?.trim() ?? "";
    }

    async getActualPriceItem(): Promise<string> {
        const price = await this.priceItem.first().textContent();
        return price?.trim() ?? "";
    }
}


