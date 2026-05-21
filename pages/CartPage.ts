import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private cartItems = this.page.locator('[data-test="inventory-item"]');
  private itemNames = this.page.locator('[data-test="inventory-item-name"]');
  private removeButtons = this.page.getByRole('button', { name: 'Remove' });
  private checkoutButton = this.page.locator('[data-test="checkout"]');

  async expectCartPageOpened() {
    await expect(this.page).toHaveURL(/cart.html/);
  }

  async expectItemVisible(itemName: string) {
    await expect(this.itemNames.filter({ hasText: itemName })).toBeVisible();
  }

  async getFirstCartItemName() {
    return await this.itemNames.first().textContent();
  }

  async removeFirstItem() {
    await this.removeButtons.first().click();
  }

  async expectCartEmpty() {
    await expect(this.cartItems).toHaveCount(0);
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}