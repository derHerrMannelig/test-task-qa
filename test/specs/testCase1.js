import LoginPage from '../pageobjects/login.page.js'

describe('Valid Login', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
    })
})
