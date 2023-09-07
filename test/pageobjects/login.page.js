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

    open () {
        return super.open('');
    }
}

export default new LoginPage();
