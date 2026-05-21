import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {

  private completeHeader =
    this.page.locator('[data-test="complete-header"]');

  async expectCheckoutCompletePageOpened() {
    await expect(this.page)
      .toHaveURL(/checkout-complete.html/);
  }

  async expectOrderSuccessMessage() {

    await expect(this.completeHeader)
      .toHaveText('Thank you for your order!');
  }
}