import { $ } from '@wdio/globals'
import Page from './page.js'
import { browser } from '@wdio/globals'
import assert from 'node:assert'

class LoginPage extends Page {
    get inputUsername () {
        return $('input[id="user-name"]');
    }

    get inputPassword () {
        return $('input[id="password"]');
    }

    get btnSubmit () {
        return $('input[id="login-button"]');
    }

    async loginUsername (username) {
        await this.inputUsername.setValue(username);
        // check if value corresponds to set
        const login = await this.inputUsername.getValue();
        assert.strictEqual(login, username);
        console.log(`Username: ${login}`);
    }
    async loginPassword (password) {
        await this.inputPassword.setValue(password);
        // check if value corresponds to set
        const pass = await this.inputPassword.getValue();
        assert.strictEqual(pass, password);
        console.log(`Password: ${pass}`);
        // check if input is masked (html attribute 'type="password"')
        const type = await this.inputPassword.getAttribute('type');
        assert.strictEqual(type, 'password');
        console.log(`Password is masked, type='${type}'`);
    }
    async loginClick (){
        await this.btnSubmit.click();
    }
    async loginValid (){
        // check of current webpage
        const page = await browser.getUrl();
        assert.strictEqual(page, 'https://www.saucedemo.com/inventory.html');
        console.log(`Redirected to: ${page}`);
        // check of displayed elements
        const products = await $('div.inventory_list');
        const cart = await $('a.shopping_cart_link');
        let productsDisplayed = await products.isDisplayed();
        let cartDisplayed = await cart.isDisplayed();
        assert.strictEqual(productsDisplayed, true);
        assert.strictEqual(cartDisplayed, true);
        console.log(`Products are displayed: ${productsDisplayed}\nCart is displayed: ${cartDisplayed}`);
    }
    async loginError (errorMsgText){
        // check of error icons
        const icons = await $$('svg.error_icon');
        let iconsDisplayed = true;
        for (const icon of icons) {
            let iconDisplayed = await icon.isDisplayed();
            iconsDisplayed = iconsDisplayed && iconDisplayed;
        }
        assert.strictEqual(iconsDisplayed, true);
        console.log(`"X" icons are displayed on the "Login" and "Password" fields: ${iconsDisplayed}`);
        // check of highlights
        const highlights = await $$('input.input_error.error');
        let highlightsExist = true;
        for (const highlight of highlights) {
            let highlightExist = await highlight.isExisting();
            highlightsExist = highlightsExist && highlightExist;
        }
        assert.strictEqual(highlightsExist, true);
        console.log(`Red highlights are applied to text fields: ${highlightsExist}`);
        // check of error message
        const error = await $('h3[data-test="error"]');
        let errorText = await error.getText();
        assert.strictEqual(errorText, `Epic sadface: ${errorMsgText}`);
        console.log(`Error message: ${errorText}`);
    }
    async screenshot (name) {
        await $('body').saveScreenshot(name);
    }

    open () {
        return super.open('');
    }
}

export default new LoginPage();
