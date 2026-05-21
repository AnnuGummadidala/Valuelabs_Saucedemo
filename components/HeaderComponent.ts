import { expect, Locator, Page } from '@playwright/test';

export class HeaderComponent {

  private cartLink: Locator;
  private cartBadge: Locator;
  private burgerMenuButton: Locator;
  private logoutLink: Locator;
  private resetAppStateLink: Locator;

  constructor(private page: Page) {

    this.cartLink =
      this.page.locator('[data-test="shopping-cart-link"]');

    this.cartBadge =
      this.page.locator('[data-test="shopping-cart-badge"]');

    this.burgerMenuButton =
      this.page.getByRole('button', {
        name: 'Open Menu',
      });

    this.logoutLink =
      this.page.locator('[data-test="logout-sidebar-link"]');

    this.resetAppStateLink =
      this.page.locator('[data-test="reset-sidebar-link"]');
  }

  async openCart() {
    await this.cartLink.click();
  }

  async expectCartBadgeCount(count: string) {
    await expect(this.cartBadge).toHaveText(count);
  }

  async expectCartBadgeHidden() {
    await expect(this.cartBadge).toBeHidden();
  }

  async openBurgerMenu() {
    await this.burgerMenuButton.click();
  }

  async logout() {
    await this.openBurgerMenu();
    await this.logoutLink.click();
  }

  async resetAppState() {
    await this.openBurgerMenu();
    await this.resetAppStateLink.click();
  }
}