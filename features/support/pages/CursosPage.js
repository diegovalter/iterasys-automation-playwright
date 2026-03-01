const { expect } = require('@playwright/test')

class CursosPage {
    constructor(page) {
        this.page = page
        this.paginaInicial = 'text=Página inicial'
        this.todosCursos = 'text=Ver todos os cursos'
    }

    async irInicial() {
        await this.page.click(this.paginaInicial)
    }

    async cursos() {
        await this.page.click(this.todosCursos)
    }

    async validarUrlCurso() {
        // Confere a URL
        await expect(this.page).toHaveURL(/.*course\/index/)
    }

}

module.exports = CursosPage