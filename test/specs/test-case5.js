import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import { browser } from '@wdio/globals'
import inventoryPage from '../pageobjects/inventory.page.js'

describe('Saving the cart after logout', () => {
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
    it('should click on the burger menu button and expand menu with 4 items', async () => {
        await InventoryPage.burgerClick();
    })
    it('should click on the logout button, which redirects to the login page, where username and password fields should be empty', async () => {
        await InventoryPage.logoutClick();
        await browser.pause(1000);
    })
    it('should login into the account using the same valid login and password', async () => {
        await LoginPage.loginUsername('standard_user');
        await LoginPage.loginPassword('secret_sauce');
        await browser.pause(1000);
        await LoginPage.loginClick();
        await LoginPage.loginValid();
        await browser.pause(1000);
    })
    it('should click on the "cart" button and redirect to cart page, item should be the same as it was added', async () => {
        await inventoryPage.cartClick();
        await inventoryPage.verifyItem();
        await browser.pause(1000);
    })
})
