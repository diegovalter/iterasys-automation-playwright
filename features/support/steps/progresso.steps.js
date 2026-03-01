const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const MeuCursoPage = require('../pages/MeuCursoPage')

let meuCursoPage

// Given('que o aluno está logado', async function () {

//})

When('acessa a pagina de uma aula de video', async function () {
    meuCursoPage = new MeuCursoPage(this.page)
    await meuCursoPage.irParaAula()
})

When('ele executa a {string}', async function (acao) {
    await meuCursoPage.executarAcao(acao)
})

When('recarrega a pagina da aula', async function () {
    await this.page.reload()
    await expect(this.page.locator('h1.h2.header-heading')).toBeVisible()
    //await this.page.reload({ waitUntil: 'networkidle' })
})

Then('o sistema deve garantir que o {string} seja', async function (resultado) {
    await meuCursoPage.validarResultado(resultado)
})