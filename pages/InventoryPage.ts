import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  private pageTitle = this.page.getByText('Products');
  private inventoryItems = this.page.locator('[data-test="inventory-item"]');
  private productNames = this.page.locator('[data-test="inventory-item-name"]');
  private productPrices = this.page.locator('[data-test="inventory-item-price"]');
  private sortDropdown = this.page.locator('[data-test="product-sort-container"]');

  async expectInventoryPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
  }

  async expectAllProductsDisplayed() {
    await expect(this.inventoryItems).toHaveCount(6);
  }

  async getProductNames() {
    return await this.productNames.allTextContents();
  }

  async getProductPrices() {
    const prices = await this.productPrices.allTextContents();

    return prices.map(price =>
      Number(price.replace('$', ''))
    );
  }

  async sortByPriceLowToHigh() {
    await this.sortDropdown.selectOption('lohi');
  }

  async sortByNameZToA() {
    await this.sortDropdown.selectOption('za');
  }

  async addFirstProductToCart() {
    await this.inventoryItems
      .first()
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async openFirstProductDetails() {
    await this.productNames.first().click();
  }

  async getFirstProductName() {
  return await this.productNames.first().textContent();
}

async getFirstProductPrice() {
  return await this.productPrices.first().textContent();
}

async getFirstProductDescription() {
  return await this.page
    .locator('[data-test="inventory-item-desc"]')
    .first()
    .textContent();
}

}