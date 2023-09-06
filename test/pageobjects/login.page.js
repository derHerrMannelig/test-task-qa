import { $ } from '@wdio/globals'
import Page from './page.js';

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

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await browser.pause(1000);
        await this.btnSubmit.click();
        await browser.pause(1000);
    }

    open () {
        return super.open('');
    }
}

export default new LoginPage();
