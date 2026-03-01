const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const NotificacaoPage = require('../pages/NotificacaoPage')
    
    
    
    // Given('que o aluno esta logado', async function () {

    // })

    When('acessa a pagina de preferencias de notificacao', async function () {
        notificacaoPage = new NotificacaoPage(this.page)
        await notificacaoPage.acessarNotificacao()
    })

    When('ele altera o switch do {string} para {string}', async function (canal, status) {
        await notificacaoPage.alterarSwitch(canal, status)
    })

    When('recarrega a pagina', async function () {
        await this.page.reload()
        await expect(this.page.locator('h1.h2.header-heading')).toBeVisible()
    })

    Then('o sistema deve garantir que o status do {string} seja', async function (status) {
        await notificacaoPage.validarStatus(status)
    })