import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'
import { browser } from '@wdio/globals'

describe('Sorting', () => {
    before(async () =>{
        await LoginPage.open();
        await LoginPage.loginUsername('standard_user');
        await LoginPage.loginPassword('secret_sauce');
        await LoginPage.loginClick();
        await LoginPage.loginValid();
        console.log(`User is on the inventory page: ${await browser.getUrl()}`)
        await InventoryPage.sortClick();
    })
    it('should sort by price (low-high)', async () => {
        await InventoryPage.sortByPrice('low-high');
        await InventoryPage.sortClick();
        await browser.pause(1000);
    })
    it('should sort by price (high-low)', async () => {
        await InventoryPage.sortByPrice('high-low');
        await InventoryPage.sortClick();
        await browser.pause(1000);
    })
    it('should sort by name (A-Z)', async () => {
        await InventoryPage.sortByName('A-Z');
        await InventoryPage.sortClick();
        await browser.pause(1000);
    })
    it('should sort by name (Z-A)', async () => {
        await InventoryPage.sortByName('Z-A');
        await InventoryPage.sortClick();
        await browser.pause(1000);
    })
})
