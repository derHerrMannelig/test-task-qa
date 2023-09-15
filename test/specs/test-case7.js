import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import { browser } from '@wdio/globals'

describe('Footer Links', () => {
    before(async () =>{
        await LoginPage.open();
        await LoginPage.loginUsername('standard_user');
        await LoginPage.loginPassword('secret_sauce');
        await LoginPage.loginClick();
        await LoginPage.loginValid();
        console.log(`User is on the inventory page: ${await browser.getUrl()}`)
    })
    it('should click on the social icon (Twitter), webpage opens in the new tab', async () => {
        await InventoryPage.socialRedirect('Twitter');
    })
    it('should click on the social icon (Facebook), webpage opens in the new tab', async () => {
        await InventoryPage.socialRedirect('Facebook');
    })
    it('should click on the social icon (Linkedin), webpage opens in the new tab', async () => {
        await InventoryPage.socialRedirect('Linkedin');
    })
})
