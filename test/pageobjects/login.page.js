import { $ } from '@wdio/globals'
import Page from './page.js'
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
    async loginError (){
        // console check of error icons
        const icons = await $('svg.error_icon');
        let iconsDisplayed = await icons.isDisplayed();
        console.log(`"X" icons are displayed on the "Login" and "Password" fields: ${iconsDisplayed}`);
        // console check of highlights
        const highlight = await $('input.input_error.error');
        let highlightExist = await highlight.isExisting();
        console.log(`Red highlights are applied to text fields: ${highlightExist}`);
        // strict check of error message
        const error = await $('h3[data-test="error"]');
        let errorText = await error.getText();
        assert.strictEqual(errorText, 'Epic sadface: Username and password do not match any user in this service');
        console.log(`Error message: ${errorText}`);
    }

    open () {
        return super.open('');
    }
}

export default new LoginPage();
