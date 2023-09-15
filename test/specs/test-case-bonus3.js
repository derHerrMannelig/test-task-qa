import LoginPage from '../pageobjects/login.page.js'
import { browser } from '@wdio/globals'

describe('Login with banned credentials', () => {
    before(async () =>{
        await LoginPage.open();
        console.log(`User is on the login page: ${await browser.getUrl()}`)
    })
    it('should enter banned login into "login" field', async () => {
        await LoginPage.loginUsername('locked_out_user');
    })
    it('should enter valid password into "password" field, data is represented as dots', async () => {
        await LoginPage.loginPassword('secret_sauce');
        await browser.pause(1000);
    })
    it('should on click display "X" icons, highlight fields with red and display error message', async () => {
        await LoginPage.loginClick();
        await LoginPage.loginError('Sorry, this user has been locked out.');
        await browser.pause(1000);
    })
})
