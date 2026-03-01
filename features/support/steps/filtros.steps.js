const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const CursosPage = require('../pages/CursosPage')

let cursosPage

// Given('que o aluno está logado', async function () {
// })

When('acessa a pagina inicial de cursos', async function () {
    cursosPage = new CursosPage(this.page);
    await cursosPage.irInicial()
    await cursosPage.cursos()
    await cursosPage.validarUrlCurso()
})

When('ele seleciona a {string} no menu de filtros', async function (categoria) {
    // 1. Clica no botão para abrir o menu de filtros
    await this.page.click('span.filter-option')
    // 2. Espera o menu abrir
    await this.page.waitForSelector('.dropdown-menu.show')
    // 3. Clica na categoria específica da tabela
    const seletorOpcao = `.dropdown-menu.show .category-link:has-text("${categoria}")`
    await this.page.click(seletorOpcao)
})

Then('o sistema deve atualizar a {string} de cursos', async function (lista) {
    await expect(this.page.locator('h1.h2.header-heading')).toHaveText(lista)
        
})

Then('verifico que o resultado exibe {string}', async function (resultado) {
    await this.page.waitForSelector('.course-number')
    await expect(this.page.locator('.course-number')).toHaveText(resultado)
    await this.page.waitForTimeout(1000)
})