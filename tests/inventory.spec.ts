import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage } from '../pages';
import { envConfig } from '../config/environment';

test.describe('Inventory functionality', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();
    await loginPage.login(
      envConfig.users.standard,
      envConfig.password
    );
  });

  test('all 6 products are displayed on inventory page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.expectInventoryPageLoaded();
    await inventoryPage.expectAllProductsDisplayed();
  });

  test('products can be sorted by price low to high', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortByPriceLowToHigh();

    const prices = await inventoryPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });

  test('products can be sorted by name Z to A', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.sortByNameZToA();

    const names = await inventoryPage.getProductNames();
    const sortedNames = [...names].sort().reverse();

    expect(names).toEqual(sortedNames);
  });
});