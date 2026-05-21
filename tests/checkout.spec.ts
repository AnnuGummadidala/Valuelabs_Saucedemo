import { test } from '@playwright/test';

import {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutInfoPage,
  CheckoutOverviewPage,
  CheckoutCompletePage,
} from '../pages';

import { HeaderComponent } from '../components';
import { envConfig } from '../config/environment';
import { generateCheckoutUser } from '../utils/testData';

test.describe('Checkout functionality', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();

    await loginPage.login(
      envConfig.users.standard,
      envConfig.password
    );
  });

  test('standard user can complete checkout successfully', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const header = new HeaderComponent(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    const checkoutUser = generateCheckoutUser();

    await inventoryPage.addFirstProductToCart();

    await header.expectCartBadgeCount('1');

    await header.openCart();

    await cartPage.expectCartPageOpened();

    await cartPage.clickCheckout();

    await checkoutInfoPage.expectCheckoutInfoPageOpened();

    await checkoutInfoPage.continueCheckout(
      checkoutUser.firstName,
      checkoutUser.lastName,
      checkoutUser.postalCode
    );

    await checkoutOverviewPage.expectCheckoutOverviewPageOpened();

    await checkoutOverviewPage.expectPriceSummaryVisible();

    await checkoutOverviewPage.clickFinish();

    await checkoutCompletePage.expectCheckoutCompletePageOpened();

    await checkoutCompletePage.expectOrderSuccessMessage();
  });

  test('checkout info page shows validation error when first name is missing', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const header = new HeaderComponent(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);

    const checkoutUser = generateCheckoutUser();

    await inventoryPage.addFirstProductToCart();

    await header.openCart();

    await cartPage.clickCheckout();

    await checkoutInfoPage.expectCheckoutInfoPageOpened();

    await checkoutInfoPage.continueCheckout(
      '',
      checkoutUser.lastName,
      checkoutUser.postalCode
    );

    await checkoutInfoPage.expectValidationError(
      'First Name is required'
    );
  });

  test('checkout info page shows validation error when last name is missing', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const header = new HeaderComponent(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);

    const checkoutUser = generateCheckoutUser();

    await inventoryPage.addFirstProductToCart();

    await header.openCart();

    await cartPage.clickCheckout();

    await checkoutInfoPage.expectCheckoutInfoPageOpened();

    await checkoutInfoPage.continueCheckout(
      checkoutUser.firstName,
      '',
      checkoutUser.postalCode
    );

    await checkoutInfoPage.expectValidationError(
      'Last Name is required'
    );
  });

  test('checkout info page shows validation error when postal code is missing', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const header = new HeaderComponent(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);

    const checkoutUser = generateCheckoutUser();

    await inventoryPage.addFirstProductToCart();

    await header.openCart();

    await cartPage.clickCheckout();

    await checkoutInfoPage.expectCheckoutInfoPageOpened();

    await checkoutInfoPage.continueCheckout(
      checkoutUser.firstName,
      checkoutUser.lastName,
      ''
    );

    await checkoutInfoPage.expectValidationError(
      'Postal Code is required'
    );
  });
});