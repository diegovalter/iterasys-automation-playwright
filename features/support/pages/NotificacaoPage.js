const { expect } = require('@playwright/test')

class NotificacaoPage {
    constructor(page) {
        this.page = page
    }

    async acessarNotificacao() {
        // Caminho para chegar até a página de notificações
        await this.page.click('#user-menu-toggle')
        await this.page.click('.dropdown-item:has-text("Preferências")')
        await this.page.click('a:has-text("Preferências de notificação")')
    }

    /**
     * Altera o switch apenas se ele não estiver no estado desejado.
     * @param {string} canal - "Web" ou "E-mail"
     * @param {string} statusDesejado - "ON" ou "OFF"
     */
    async alterarSwitch(canal, statusDesejado) {
        const sufixoId = (canal === 'Web') ? "popup" : "email"

        // 1. Identifica a linha e os elementos (Input para ler, Label para clicar)
        const linhaTarefa = this.page.locator('tr', { hasText: 'Notificações de tarefa' })
        const inputReal = linhaTarefa.locator(`input[id$="_notification_${sufixoId}"]`)
        const oSwitch = linhaTarefa.locator(`label[for$="_notification_${sufixoId}"]`)

        // 2. Checa o estado atual do elemento
        const estaLigado = await inputReal.isChecked()
        const querLigar = (statusDesejado === "ON")

        // 3. Lógica de decisão: Só clica se o estado atual for diferente do que você quer
        if (estaLigado !== querLigar) {
            await oSwitch.scrollIntoViewIfNeeded()
            // Usamos dispatchEvent porque o switch do Moodle às vezes sobrepõe o clique
            await oSwitch.dispatchEvent('click')
            
            // Aguarda o processamento do AJAX do Moodle
            await this.page.waitForTimeout(2000)
            console.log(`Log: O canal ${canal} foi alterado para ${statusDesejado}.`)
        } else {
            console.log(`Log: O canal ${canal} já estava em ${statusDesejado}. Clique ignorado para manter o estado.`)
        }
    }

    async validarStatus(mensagem) {
        // Verifica se a mensagem vinda do BDD pede ON ou OFF
        const deveEstarLigado = mensagem.includes("ON");
        const sufixo = mensagem.includes("OFF") ? "email" : "popup"

        // 1. Localiza a linha específica
        const linhaTarefa = this.page.locator('tr', { hasText: 'Notificações de tarefa' })

        // 2. Localiza o INPUT dentro dessa linha
        const inputReal = linhaTarefa.locator(`input[id$="_notification_${sufixo}"]`)

        // 3. Validação final
        if (deveEstarLigado) {
            await expect(inputReal).toBeChecked({ timeout: 10000 })
        } else {
            await expect(inputReal).not.toBeChecked({ timeout: 10000 })
        }
    }
}

module.exports = NotificacaoPage