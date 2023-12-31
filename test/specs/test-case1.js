import LoginPage from '../pageobjects/login.page.js'
import { browser } from '@wdio/globals'

describe('Valid Login', () => {
    before(async () =>{
        await LoginPage.open();
        console.log(`User is on the login page: ${await browser.getUrl()}`)
    })
    it('should enter valid login into "login" field', async () => {
        await LoginPage.loginUsername('standard_user');
    })
    it('should enter valid password into "password" field, data is represented as dots', async () => {
        await LoginPage.loginPassword('secret_sauce');
        await browser.pause(1000);
    })
    it('should on click redirect user to inventory page, products and cart are displayed', async () => {
        await LoginPage.loginClick();
        await LoginPage.loginValid();
        await browser.pause(1000);
    })
})
