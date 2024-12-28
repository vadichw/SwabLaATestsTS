import {expect, type Locator, type Page} from '@playwright/test';

export class MainPage {
    readonly page : Page;
    readonly headerPage : Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerPage = page.locator("//span[@data-test='title']");
    }

    async chechHeader(expectedHeaderPage: string) {
        await this.headerPage.isVisible();
        const actualHeaderPage = await this.headerPage.textContent();
        expect(actualHeaderPage).toBe(expectedHeaderPage)
    }
}