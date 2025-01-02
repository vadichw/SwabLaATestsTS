import { expect, type Locator, type Page } from "@playwright/test";

export class OrdersPage {
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly zippostalCodeField: Locator;
    readonly continueButton: Locator;
    readonly nameItemInOrders: Locator;
    readonly priceItemInOrders: Locator;
    readonly taxField: Locator;
    readonly totalPrice: Locator;
    readonly finishButton: Locator;
    readonly textAfterFinishingOrder: Locator;
    readonly backTHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameField = page.locator("//input[@data-test='firstName']");
        this.lastNameField = page.locator("//input[@data-test='lastName']");
        this.zippostalCodeField = page.locator("//input[@data-test='postalCode']");
        this.continueButton = page.locator("//input[@data-test='continue']");
        this.nameItemInOrders = page.locator("//div[@data-test='inventory-item-name']");
        this.priceItemInOrders = page.locator("//div[@data-test='inventory-item-price']");
        this.taxField = page.locator("//div[@data-test='tax-label']");
        this.totalPrice = page.locator("//div[@data-test='total-label']");
        this.finishButton = page.locator("//button[@data-test='finish']");
        this.textAfterFinishingOrder = page.locator("//h2[@data-test='complete-header']");
        this.backTHomeButton = page.locator("//button[@data-test='back-to-products']");
    }

    async fillDataForOrder(firstName: string, lastName: string, code: string) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.zippostalCodeField.fill(code);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async assertItemsInOrder(expectedNameItemInOrder: string, expectedPriceInOrder: string) {
        const actualNamerItemInOrder = (await this.nameItemInOrders.textContent())?.trim() ?? "";
        const actualPriceItemInOrder = (await this.priceItemInOrders.textContent())?.trim() ?? "";

        expect(expectedNameItemInOrder).toBe(actualNamerItemInOrder);
        expect(expectedPriceInOrder).toBe(actualPriceItemInOrder);
    }

    async checkPriceItemWithTax(priceItem) {
        const tax = (await this.taxField.textContent())?.trim() ?? "";
        const actualPriceItemInOrder = (await this.priceItemInOrders.textContent())?.trim() ?? "";
        const priceWithTax = (await this.totalPrice.textContent())?.trim() ?? "";
    
        const taxNum = parseFloat(tax.replace(/[^0-9.]/g, ""));
        const priceNum = parseFloat(actualPriceItemInOrder.replace(/[^0-9.]/g, ""));
        const totalSumNum = parseFloat(priceWithTax.replace(/[^0-9.]/g, ""));
    
        expect(priceNum + taxNum).toBeCloseTo(totalSumNum, 2);
    }    

    async finishOrder(expectedFinishingText: string) {
        await this.finishButton.click();
        const actualFinishingText = (await this.textAfterFinishingOrder.textContent())?.trim() ?? "";
        expect(expectedFinishingText).toBe(actualFinishingText);
    }

    async backToHomePage(expectedURL: string) {
        await this.backTHomeButton.click();

        const currentURL = await this.page.url();
        expect(expectedURL).toBe(currentURL);
    }
}