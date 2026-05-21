import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutInfoPage extends BasePage {

  private firstNameInput =
    this.page.locator('[data-test="firstName"]');

  private lastNameInput =
    this.page.locator('[data-test="lastName"]');

  private postalCodeInput =
    this.page.locator('[data-test="postalCode"]');

  private continueButton =
    this.page.locator('[data-test="continue"]');

  private errorMessage =
    this.page.locator('[data-test="error"]');

  async expectCheckoutInfoPageOpened() {
    await expect(this.page)
      .toHaveURL(/checkout-step-one.html/);
  }

  async fillCheckoutInfo(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {

    await this.firstNameInput.fill(firstName);

    await this.lastNameInput.fill(lastName);

    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async continueCheckout(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {

    await this.fillCheckoutInfo(
      firstName,
      lastName,
      postalCode
    );

    await this.clickContinue();
  }

  async expectValidationError(message: string) {
    await expect(this.errorMessage)
      .toContainText(message);
  }
}