import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import { browser } from '@wdio/globals'

describe('Checkout without items', () => {
    before(async () =>{
        await LoginPage.open();
        await LoginPage.loginUsername('standard_user');
        await LoginPage.loginPassword('secret_sauce');
        await LoginPage.loginClick();
        await LoginPage.loginValid();
        console.log(`User is on the inventory page: ${await browser.getUrl()}`)
        await browser.pause(1000);
    })
    it('should click on the "cart" button and redirect to cart page, items should be absent', async () => {
        await InventoryPage.cartClick();
        await InventoryPage.verifyItem();
        await browser.pause(1000);
    })
    // next step should fail
    it('should click on the "checkout" button, user is left on the cart page, error message "Cart is empty" is displayed', async () => {
        await InventoryPage.checkoutClick();
        await browser.pause(1000);
        await LoginPage.screenshot('test-case9-fail.png');
        await InventoryPage.checkoutInvalid();
    })
})
