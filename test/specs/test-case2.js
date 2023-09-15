import LoginPage from '../pageobjects/login.page.js'
import { browser } from '@wdio/globals'

describe('Login with invalid password', () => {
    before(async () =>{
        await LoginPage.open();
        console.log(`User is on the login page: ${await browser.getUrl()}`)
    })
    it('should enter valid login into "login" field', async () => {
        await LoginPage.loginUsername('standard_user');
    })
    it('should enter invalid password into "password" field, data is represented as dots', async () => {
        await LoginPage.loginPassword('s3cret_s4uce');
        await browser.pause(1000);
    })
    it('should on click display "X" icons, highlight fields with red and display error message', async () => {
        await LoginPage.loginClick();
        await LoginPage.loginError('Username and password do not match any user in this service');
        await browser.pause(1000);
    })
})
