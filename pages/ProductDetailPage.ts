import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {

  private productName =
    this.page.locator('[data-test="inventory-item-name"]');

  private productDescription =
    this.page.locator('[data-test="inventory-item-desc"]');

  private productPrice =
    this.page.locator('[data-test="inventory-item-price"]');

  private addToCartButton =
    this.page.getByRole('button', {
      name: 'Add to cart',
    });

  async expectProductDetailPageOpened() {
    await expect(this.page)
      .toHaveURL(/inventory-item.html/);
  }

  async getProductName() {
    return await this.productName.textContent();
  }

  async getProductDescription() {
    return await this.productDescription.textContent();
  }

  async getProductPrice() {
    return await this.productPrice.textContent();
  }

  async addProductToCart() {
    await this.addToCartButton.click();
  }
}