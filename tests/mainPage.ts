import {expect, type Locator, type Page} from '@playwright/test';

export class MainPage {
    readonly page : Page;
    readonly headerPage : Locator;
    readonly buttonAddToCard: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerPage = page.locator("//span[@data-test='title']");       
        this.buttonAddToCard = page.locator("//button[@id='add-to-cart-sauce-labs-backpack']");
    }

    async chechHeader(expectedHeaderPage: string) {
        await this.headerPage.isVisible();
        const actualHeaderPage = await this.headerPage.textContent();
        expect(actualHeaderPage).toBe(expectedHeaderPage)
    }

    async addItemToCard() {
        await this.buttonAddToCard.isVisible();
        await this.buttonAddToCard.click();
    }
}
