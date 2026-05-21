import { test, expect } from '@playwright/test';

import {
  LoginPage,
  InventoryPage,
  ProductDetailPage,
} from '../pages';

import { envConfig } from '../config/environment';

test.describe('Product detail functionality', () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();

    await loginPage.login(
      envConfig.users.standard,
      envConfig.password
    );
  });

  test('product detail page displays correct product information', async ({ page }) => {

    const inventoryPage =
      new InventoryPage(page);

    const productDetailPage =
      new ProductDetailPage(page);

    const expectedName =
      await inventoryPage.getFirstProductName();

    const expectedPrice =
      await inventoryPage.getFirstProductPrice();

    const expectedDescription =
      await inventoryPage.getFirstProductDescription();

    await inventoryPage.openFirstProductDetails();

    await productDetailPage
      .expectProductDetailPageOpened();

    expect(
      await productDetailPage.getProductName()
    ).toBe(expectedName);

    expect(
      await productDetailPage.getProductPrice()
    ).toBe(expectedPrice);

    expect(
      await productDetailPage.getProductDescription()
    ).toBe(expectedDescription);
  });
});