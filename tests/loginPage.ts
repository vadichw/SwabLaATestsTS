import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginField: Locator;
  readonly passwordField: Locator;
  readonly buttonLogin: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginField = page.locator("//input[@id='user-name']");
    this.passwordField = page.locator("//input[@id='password']");
    this.buttonLogin = page.locator("//input[@type='submit']");
    this.errorMessage = page.locator("//div[@class ='error-message-container error']");
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.loginField.fill(username);
    await this.passwordField.fill(password);
    await this.buttonLogin.click();
  }

  async checkErrorMsg(expectedErrorText) {
    await this.errorMessage.isVisible();
    const actualErrorText = await this.errorMessage.textContent();
    expect(actualErrorText).toBe(expectedErrorText);
  }
}