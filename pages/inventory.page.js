class InventoryPage {
  constructor(page) {
    this.page = page;
    this.backpackAddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addBackpackToCart() {
    await this.backpackAddButton.click();
  }

  async getCartBadgeCount() {
    const badgeText = await this.cartBadge.textContent();
    return parseInt(badgeText, 10);
  }

  async cartBadgeIsVisible() {
    return await this.cartBadge.isVisible();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = InventoryPage;
