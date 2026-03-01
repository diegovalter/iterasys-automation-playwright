const { After, Before, setDefaultTimeout } = require("@cucumber/cucumber")
const { chromium } = require("playwright")

setDefaultTimeout(60 * 1000)

Before(async function () {
    
    this.browser = await chromium.launch({ 
        headless: false, 
        slowMo: 400
    })
    this.context = await this.browser.newContext()
    this.page = await this.context.newPage()
    await this.page.bringToFront()    
})

After(async function () {
    if (this.page) await this.page.close()
    if (this.context) await this.context.close()
    if (this.browser) await this.browser.close()
})