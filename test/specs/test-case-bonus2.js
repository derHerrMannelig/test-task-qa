import LoginPage from '../pageobjects/login.page.js'
import { browser } from '@wdio/globals'

describe('Login without password', () => {
    before(async () =>{
        await LoginPage.open();
        console.log(`User is on the login page: ${await browser.getUrl()}`)
    })
    it('should enter valid login into "login" field', async () => {
        await LoginPage.loginUsername('standard_user');
        await browser.pause(1000);
    })
    it('should on click display "X" icons, highlight fields with red and display error message', async () => {
        await LoginPage.loginClick();
        await LoginPage.loginError('Password is required');
        await browser.pause(1000);
    })
})
