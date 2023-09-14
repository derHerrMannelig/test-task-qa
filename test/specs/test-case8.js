import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import CheckoutPage from '../pageobjects/checkout.page.js'
import { browser } from '@wdio/globals'

describe('Valid Checkout', () => {
    before(async () =>{
        await LoginPage.open();
        await LoginPage.loginUsername('standard_user');
        await LoginPage.loginPassword('secret_sauce');
        await LoginPage.loginClick();
        await LoginPage.loginValid();
        console.log(`User is on the inventory page: ${await browser.getUrl()}`)
    })
    it('should click on the any "add to the cart" button, number near the cart should increase by 1', async () => {
        await InventoryPage.anyAddToCart();
        await InventoryPage.cartSvg(1);
    })
    it('should click on the "cart" button and redirect to cart page, item should be the same as it was added', async () => {
        await InventoryPage.cartClick();
        await InventoryPage.verifyItem();
        await browser.pause(1000);
    })
    it('should click on the "checkout" button and redirect to checkout page, checkout form is displayed', async () => {
        await InventoryPage.checkoutClick();
        await InventoryPage.checkoutValid();
        await browser.pause(500);
    })
    it('should enter valid first name into "First Name" field', async () => {
        await CheckoutPage.checkoutFirstName('John');
        await browser.pause(500);
    })
    it('should enter valid last name into "Last Name" field', async () => {
        await CheckoutPage.checkoutLastName('Doe');
        await browser.pause(500);
    })
    it('should enter valid postal code into "Zip/Postal Code" field', async () => {
        await CheckoutPage.checkoutPostalCode('77777');
        await browser.pause(500);
    })
    it('should click on the "continue" button and redirect to overview page, item and price from step 1 are displayed and valid', async () => {
        await CheckoutPage.continueClick();
        await CheckoutPage.itemCheck();
        await browser.pause(1000);
    })
    it('should click on the "Finish" button and redirect to "Checkout Complete" page, "Thank you for your order!" message is displayed', async () => {
        await CheckoutPage.finishClick();
        await browser.pause(1000);
    })
    it('should click on the "Back Home" button and redirect to inventory page, products and cart are displayed, cart is empty', async () => {
        await CheckoutPage.backClick();
        await LoginPage.loginValid();
        await InventoryPage.cartSvg('');
        await browser.pause(1000);
    })
})
