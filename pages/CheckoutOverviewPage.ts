import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {

  private finishButton =
    this.page.locator('[data-test="finish"]');

  private itemTotal =
    this.page.locator('[data-test="subtotal-label"]');

  private tax =
    this.page.locator('[data-test="tax-label"]');

  private total =
    this.page.locator('[data-test="total-label"]');

  async expectCheckoutOverviewPageOpened() {
    await expect(this.page)
      .toHaveURL(/checkout-step-two.html/);
  }

  async expectPriceSummaryVisible() {

    await expect(this.itemTotal).toBeVisible();

    await expect(this.tax).toBeVisible();

    await expect(this.total).toBeVisible();
  }

  async clickFinish() {
    await this.finishButton.click();
  }
}