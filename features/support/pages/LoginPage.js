// LoginPage.js
class LoginPage {
    constructor(page) {
        this.page = page
        this.botaoAcessar = '#user-menu-toggle'
        this.emailInput = '#username'
        this.senhaInput = '#password'
        this.botaoEntrar = '#loginbtn'
        this.loader = '#page-loader-wrapper'
    }

    async navegar() {
        await this.page.goto('https://www.iterasys.com')
    }

    async abrirLogin() {
        await this.page.waitForSelector(this.loader, { state: 'hidden' })
        await this.page.click(this.botaoAcessar)
    }

    async realizarLogin(usuario, senha) {
        await this.page.locator(this.emailInput).evaluate(el => el.style.opacity = '0')
        await this.page.locator(this.senhaInput).evaluate(el => el.style.opacity = '0')
        await this.page.fill(this.emailInput, usuario)
        await this.page.fill(this.senhaInput, senha)
        await this.page.click(this.botaoEntrar)
    }
}

module.exports = LoginPage