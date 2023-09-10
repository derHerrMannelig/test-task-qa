import { $ } from '@wdio/globals'
import Page from './page.js'
import loginPage from './login.page.js'
import { browser } from '@wdio/globals'
import assert from 'node:assert'

class InventoryPage extends Page {
    // necessary for checking cart item
    constructor () {
        super();
        this.invItem;
    }

    get btnBurger () {
        return $('button[id="react-burger-menu-btn"]');
    }
    get btnLogout () {
        return $('a[id="logout_sidebar_link"]')
    }
    get btnCart () {
        return $('a.shopping_cart_link')
    }
    get btnAddToCart () {
        return $$('button.btn.btn_primary.btn_small.btn_inventory')
    }
    get inventoryItems () {
        return $$('div.inventory_item_name')
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

    async anyAddToCart (){
        // random choice of item
        const btns = await this.btnAddToCart;
        var randItem = Math.floor(Math.random() * btns.length);
        await btns[randItem].scrollIntoView({ block: 'center', inline: 'center' });
        await btns[randItem].click();
        this.invItem = await this.inventoryItems[randItem].getText();
        console.log(`Button clicked: ${randItem + 1}. This is: ${this.invItem}`)
        await browser.pause(500);
    }

    async cartSvg (itemNumber) {
        // check of number of items displayed near cart svg
        const svg = await $('span.shopping_cart_badge');
        await svg.scrollIntoView({ block: 'center', inline: 'center' });
        await browser.pause(500);
        let boughtItems = await svg.getText();
        assert.strictEqual(boughtItems, `${itemNumber}`);
        console.log(`Item is added to the cart, quantity: ${boughtItems}`);
    }
    async cartClick () {
        await this.btnCart.click();
        // check of current webpage
        const page = await browser.getUrl();
        assert.strictEqual(page, 'https://www.saucedemo.com/cart.html');
        console.log(`Redirected to: ${page}`);
    }
    async verifyItem () {
        // check if item in cart corresponds to chosen before
        const itemPending = await $('div.inventory_item_name');
        let itemPendingName = await itemPending.getText();
        assert.strictEqual(itemPendingName, this.invItem);
        console.log(`Item is the same: ${itemPendingName}`);
    }
}

export default new InventoryPage();
