import LoginPage from '../pageobjects/login.page.js'
import { browser } from '@wdio/globals'

describe('Valid Login', () => {
    it('should enter valid login into "login" field', async () => {
        await LoginPage.open();
        await LoginPage.loginUsername('standard_user');
    })
    it('should enter valid password into "password" field, data is represented as dots', async () => {
        await LoginPage.loginPassword('secret_sauce');
        await browser.pause(1000);
    })
    it('should on click redirect user to inventory page, products and cart are displayed', async () => {
        await LoginPage.loginClick();
        // console check of current webpage
        const page = await browser.getUrl();
        console.log(`Redirected to: ${page}`);
        // console check of displayed elements
        const products = await $('div.inventory_list');
        const cart = await $('a.shopping_cart_link');
        let productsDisplayed = await products.isDisplayed();
        let cartDisplayed = await cart.isDisplayed();
        console.log(`Products are displayed: ${productsDisplayed}\nCart is displayed: ${cartDisplayed}`);
        await browser.pause(1000);
    })
})
