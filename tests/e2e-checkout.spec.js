const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');
const CartPage = require('../pages/cart.page');
const CheckoutPage = require('../pages/checkout.page');

test.describe('SauceDemo E2E Checkout Flow', () => {
  let loginPage, inventoryPage, cartPage, checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
  });

  test('Complete purchase flow: login → add item → checkout → confirmation', async ({ page }) => {
    // Step 1: Login
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory/);

    // Step 2: Add Sauce Labs Backpack to cart
    await inventoryPage.addBackpackToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // Step 3: Navigate to cart
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart/);
    await expect(cartPage.cartItems).toHaveCount(1);

    // Step 4: Proceed to checkout step 1
    await cartPage.goToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one/);

    // Step 5: Fill checkout information
    await checkoutPage.fillCheckoutInfo('John', 'Doe', '12345');
    await checkoutPage.continueCheckout();
    await expect(page).toHaveURL(/.*checkout-step-two/);

    // Step 6: Verify order summary on step 2
    await expect(checkoutPage.orderSummary).toBeVisible();
    await expect(checkoutPage.cartItems).toHaveCount(1);

    // Step 7: Finish order
    await checkoutPage.finishOrder();
    await expect(page).toHaveURL(/.*checkout-complete/);

    // Step 8: Verify completion
    await expect(checkoutPage.completionHeader).toContainText('Thank you for your order!');
  });
});
