import { test } from '@playwright/test';
import {
  LoginPage,
  InventoryPage,
  CartPage,
} from '../pages';

import { HeaderComponent } from '../components';

import { envConfig } from '../config/environment';

test.describe('Cart functionality', () => {

  test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();

    await loginPage.login(
      envConfig.users.standard,
      envConfig.password
    );
  });

  test('adding item updates cart badge and displays item in cart', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);

    const header = new HeaderComponent(page);

    const cartPage = new CartPage(page);

    await inventoryPage.addFirstProductToCart();

    await header.expectCartBadgeCount('1');

    const productName =
      await inventoryPage.getFirstProductName();

    await header.openCart();

    await cartPage.expectCartPageOpened();

    await cartPage.expectItemVisible(
      productName || ''
    );
  });

  test('removing item from cart updates badge and empties cart', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);

    const header = new HeaderComponent(page);

    const cartPage = new CartPage(page);

    await inventoryPage.addFirstProductToCart();

    await header.expectCartBadgeCount('1');

    await header.openCart();

    await cartPage.expectCartPageOpened();

    await cartPage.removeFirstItem();

    await cartPage.expectCartEmpty();

    await header.expectCartBadgeHidden();
  });
});