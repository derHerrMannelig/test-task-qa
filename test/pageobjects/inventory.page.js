import { $ } from '@wdio/globals'
import Page from './page.js'
import loginPage from './login.page.js'
import { browser } from '@wdio/globals'
import assert from 'node:assert'

class InventoryPage extends Page {
    get btnBurger () {
        return $('button[id="react-burger-menu-btn"]');
    }
    get btnLogout () {
        return $('a[id="logout_sidebar_link"]')
    }

    async burgerClick (){
        await this.btnBurger.click();
        // pause is necessary, for some reason without it all checks w/o clicking burger pass as true no matter what
        // maybe it's because of redirect - inventory page needs some time to load correctly
        await browser.pause(1000);
        // check if menu is expanded
        const menu = await $('div.bm-menu-wrap');
        let menuDisplayed = await menu.isDisplayed();
        assert.strictEqual(menuDisplayed, true);
        console.log(`Menu is expanded: ${menuDisplayed}`);
        // check if 4 menu items are displayed
        const menuItems = await $$('a.bm-item');
        assert.strictEqual(menuItems.length, 4);
        let menuItemsDisplayed = true;
        for (const menuItem of menuItems) {
            let menuItemDisplayed = await menuItem.isDisplayed();
            menuItemsDisplayed = menuItemsDisplayed && menuItemDisplayed;
        }
        assert.strictEqual(menuItemsDisplayed, true);
        console.log(`Number of menu items: ${menuItems.length}, menu items are displayed: ${menuItemsDisplayed}`);
    }
    async logoutClick () {
        await this.btnLogout.click();
        // check of current webpage
        const page = await browser.getUrl();
        assert.strictEqual(page, 'https://www.saucedemo.com/');
        console.log(`Redirected to: ${page}`);
        // check of username and password fields
        const login = await loginPage.inputUsername.getValue();
        assert.strictEqual(login, '');
        const pass = await loginPage.inputPassword.getValue();
        assert.strictEqual(pass, '');
        console.log('Username and password fields are empty.');
    }
}

export default new InventoryPage();
