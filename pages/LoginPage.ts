import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  // Locators
  private usernameInput =
    this.page.getByPlaceholder('Username');

  private passwordInput =
    this.page.getByPlaceholder('Password');

  private loginButton =
    this.page.getByRole('button', {
      name: 'Login',
    });

  private errorMessage =
    this.page.locator('[data-test="error"]');

  // Navigation
  async openLoginPage() {
    await this.goto('/');
  }

  // Actions
  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(username: string, password: string) {
    await this.enterUsername(username);

    await this.enterPassword(password);

    await this.clickLoginButton();
  }

  // Assertions
  async expectLoginError(message: string) {
    await expect(this.errorMessage)
      .toContainText(message);
  }

  async expectInventoryPageOpened() {
    await expect(this.page)
      .toHaveURL(/inventory.html/);

    await expect(
      this.page.getByText('Products')
    ).toBeVisible();
  }

  async expectToStayOnLoginPage() {
    await expect(this.page)
      .toHaveURL(/saucedemo/);
  }
}