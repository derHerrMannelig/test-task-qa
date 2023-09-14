import { $ } from '@wdio/globals'
import Page from './page.js'
import InventoryPage from './inventory.page.js'
import { browser } from '@wdio/globals'
import assert from 'node:assert'

class CheckoutPage extends Page {
    get inputFirstName () {
        return $('input[id="first-name"]');
    }
    get inputLastName () {
        return $('input[id="last-name"]');
    }
    get inputPostalCode () {
        return $('input[id="postal-code"]');
    }
    get btnContinue () {
        return $('input[id="continue"]');
    }
    get btnFinish () {
        return $('button[id="finish"]');
    }
    get btnBack () {
        return $('button[id="back-to-products"]');
    }

    async checkoutFirstName(firstName) {
        await this.inputFirstName.setValue(firstName);
        // check if value corresponds to set
        assert.strictEqual(await this.inputFirstName.getValue(), firstName);
        console.log(`First name: ${await this.inputFirstName.getValue()}`);
    }
    async checkoutLastName(lastName) {
        await this.inputLastName.setValue(lastName);
        // check if value corresponds to set
        assert.strictEqual(await this.inputLastName.getValue(), lastName);
        console.log(`Last name: ${await this.inputLastName.getValue()}`);
    }
    async checkoutPostalCode(postalCode) {
        await this.inputPostalCode.setValue(postalCode);
        // check if value corresponds to set
        assert.strictEqual(await this.inputPostalCode.getValue(), postalCode);
        console.log(`Postal code: ${await this.inputPostalCode.getValue()}`);
    }
    async continueClick () {
        await this.btnContinue.click();
        // check of current webpage
        assert.strictEqual(await browser.getUrl(), 'https://www.saucedemo.com/checkout-step-two.html');
        console.log(`Redirected to: ${await browser.getUrl()}`);
    }
    async itemCheck () {
        // check if needed elements are displayed
        assert.strictEqual(await $('div.inventory_item_name').isDisplayed(), true);
        assert.strictEqual(await $('div.summary_subtotal_label').isDisplayed(), true);
        const checkoutItem = await $('div.inventory_item_name').getText();
        // test case implies that we need to check item total price element
        const checkoutPrice = (await $('div.summary_subtotal_label').getText()).slice(12);
        assert.strictEqual(InventoryPage.invItem, checkoutItem);
        assert.strictEqual(InventoryPage.invPrice, checkoutPrice);
        console.log(`Checkout item: ${checkoutItem}, ${checkoutPrice}`);
    }
    async finishClick () {
        await this.btnFinish.click();
        // check of current webpage
        assert.strictEqual(await browser.getUrl(), 'https://www.saucedemo.com/checkout-complete.html');
        console.log(`Redirected to: ${await browser.getUrl()}`);
        const thanksMessageStatus = await $('h2.complete-header').isDisplayed();
        assert.strictEqual(thanksMessageStatus, true);
        console.log(`"Thank you for your order!" message is displayed: ${thanksMessageStatus}`);
    }
    async backClick () {
        await this.btnBack.click();
    }
}

export default new CheckoutPage();
