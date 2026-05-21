import { test } from '@playwright/test';

import { LoginPage } from '../pages';

import { HeaderComponent } from '../components';

import { envConfig } from '../config/environment';

test.describe('User logout functionality', () => {

  test('logged in user can logout successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);

    const header = new HeaderComponent(page);

    await loginPage.openLoginPage();

    await loginPage.login(
      envConfig.users.standard,
      envConfig.password
    );

    await header.logout();

    await loginPage.expectToStayOnLoginPage();
  });
});