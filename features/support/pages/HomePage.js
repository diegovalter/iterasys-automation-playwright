const { expect } = require('@playwright/test')

class HomePage {
    constructor(page) {
        this.page = page
    }

    async validarHome() {
        // Confere a URL
        await expect(this.page).toHaveURL('https://iterasys.com/my/')
        
        // Confere se o elemento está visível
        await expect(this.page.locator('h3.welcome-note')).toBeVisible()
    }
}

module.exports = HomePage