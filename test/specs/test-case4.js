import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import { browser } from '@wdio/globals'

describe('Logout', () => {
    before(async () =>{
        await LoginPage.open();
        await LoginPage.loginUsername('standard_user');
        await LoginPage.loginPassword('secret_sauce');
        await LoginPage.loginClick();
        console.log(`User is on the inventory page: ${await browser.getUrl()}`)
    })
    it('should click on the burger menu button and expand menu with 4 items', async () => {
        await InventoryPage.burgerClick();
    })
    // TODO: Step 2
})
