class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.zipCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.orderSummary = page.locator('[data-test="total-label"]');
    this.completionHeader = page.locator('[data-test="complete-header"]');
    this.cartItems = page.locator('.cart_list .cart_item');
  }

  async fillCheckoutInfo(firstName, lastName, zipCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
  }

  async continueCheckout() {
    await this.continueButton.click();
  }

  async verifyOrderSummary() {
    return await this.orderSummary.isVisible();
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async getCompletionHeader() {
    return await this.completionHeader.textContent();
  }

  async isOrderComplete() {
    const headerText = await this.completionHeader.textContent();
    return headerText.includes('Thank you for your order!');
  }
}

module.exports = CheckoutPage;
