import LoginPage from '../pageobjects/login.page.js'
import { browser } from '@wdio/globals'

describe('Login without credentials', () => {
    before(async () =>{
        await LoginPage.open();
        console.log(`User is on the login page: ${await browser.getUrl()}`)
        await browser.pause(1000);
    })
    it('should on click display "X" icons, highlight fields with red and display error message', async () => {
        await LoginPage.loginClick();
        await LoginPage.loginError('Username is required');
        await browser.pause(1000);
    })
})
