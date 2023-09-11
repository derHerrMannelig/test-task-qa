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
    get inventoryPrices () {
        return $$('div.inventory_item_price')
    }
    get btnSort () {
        return $('select.product_sort_container')
    }
    get btnAZ () {
        return $('option[value="az"]')
    }
    get btnZA () {
        return $('option[value="za"]')
    }
    get btnLoHi () {
        return $('option[value="lohi"]')
    }
    get btnHiLo () {
        return $('option[value="hilo"]')
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
    async sortClick () {
        await this.btnSort.click();
    }
    async sortByName (button) {
        // initial array of item names as reference
        let arrayName = [];
        let inventoryItems = await this.inventoryItems;
        for (const inventoryItem of inventoryItems) {
            let arrayItem = await inventoryItem.getText();
            arrayName.push(arrayItem);
        }
        // checks of correct sorting by name
        if (button === 'A-Z') {
            arrayName.sort();
            await this.btnAZ.click();
            let az = [];
            let inventoryItems = await this.inventoryItems;
            for (const inventoryItem of inventoryItems) {
                let azItem = await inventoryItem.getText();
                az.push(azItem);
            }
            assert.strictEqual(JSON.stringify(az), JSON.stringify(arrayName));
            console.log(`Items are sorted A-Z: ${az.join(', ')}`)
        } else if (button === 'Z-A') {
            arrayName.sort((a, b) => b.localeCompare(a));
            await this.btnZA.click();
            let za = [];
            let inventoryItems = await this.inventoryItems;
            for (const inventoryItem of inventoryItems) {
                let zaItem = await inventoryItem.getText();
                za.push(zaItem);
            }
            assert.strictEqual(JSON.stringify(za), JSON.stringify(arrayName));
            console.log(`Items are sorted Z-A: ${za.join(', ')}`)
        } else {
            throw new Error("Specify correct sorting option! ('A-Z' or 'Z-A')");
        }
    }
    async sortByPrice (button) {
        // initial array of item prices as reference
        let arrayPrice = [];
        let inventoryPrices = await this.inventoryPrices;
        for (const inventoryPrice of inventoryPrices) {
            let arrayItemPrice = await inventoryPrice.getText();
            arrayPrice.push(arrayItemPrice);
        }
        // checks of correct sorting by price
        if (button === 'low-high') {
            arrayPrice.sort((a, b) => {
                const priceA = parseFloat(a.slice(1));
                const priceB = parseFloat(b.slice(1));
                return priceA - priceB;
            });
            await this.btnLoHi.click();
            let lohi = [];
            let inventoryPrices = await this.inventoryPrices;
            for (const inventoryPrice of inventoryPrices) {
                let lohiItem = await inventoryPrice.getText();
                lohi.push(lohiItem);
            }
            assert.strictEqual(JSON.stringify(lohi), JSON.stringify(arrayPrice));
            console.log(`Items are sorted low-high: ${lohi.join(', ')}`)
        } else if (button === 'high-low') {
            arrayPrice.sort((a, b) => {
                const priceA = parseFloat(a.slice(1));
                const priceB = parseFloat(b.slice(1));
                return priceB - priceA;
            });
            await this.btnHiLo.click();
            let hilo = [];
            let inventoryPrices = await this.inventoryPrices;
            for (const inventoryPrice of inventoryPrices) {
                let hiloItem = await inventoryPrice.getText();
                hilo.push(hiloItem);
            }
            assert.strictEqual(JSON.stringify(hilo), JSON.stringify(arrayPrice));
            console.log(`Items are sorted high-low: ${hilo.join(', ')}`)
        } else {
            throw new Error("Specify correct sorting option! ('low-high' or 'high-low')");
        }
    }
}

export default new InventoryPage();
