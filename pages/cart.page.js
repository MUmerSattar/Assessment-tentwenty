class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_list .cart_item');
    this.itemName = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async isItemInCart(itemName) {
    const items = await this.cartItems.count();
    return items > 0;
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = CartPage;
