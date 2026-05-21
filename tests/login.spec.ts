import { test } from '@playwright/test';
import { LoginPage } from '../pages';
import { envConfig } from '../config/environment';

test.describe('Login functionality', () => {
  test('standard user can login and navigate to inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();
    await loginPage.login(
      envConfig.users.standard,
      envConfig.password
    );

    await loginPage.expectInventoryPageOpened();
  });

  test('locked out user cannot login and sees locked user error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();
    await loginPage.login(
      envConfig.users.locked,
      envConfig.password
    );

    await loginPage.expectLoginError(
      'Sorry, this user has been locked out'
    );

    await loginPage.expectToStayOnLoginPage();
  });

  test('empty username shows username required error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();
    await loginPage.clickLoginButton();

    await loginPage.expectLoginError('Username is required');
  });

  test('empty password shows password required error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();
    await loginPage.enterUsername(envConfig.users.standard);
    await loginPage.clickLoginButton();

    await loginPage.expectLoginError('Password is required');
  });
});