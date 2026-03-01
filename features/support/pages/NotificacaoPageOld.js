const { expect } = require('@playwright/test')
class NotificacaoPage {
    constructor(page) {
        this.page = page
        this.iframeSeletor = 'iframe[src*="vimeo"]'
        this.videoSeletor = 'video'
        this.btnConcluirSeletor = 'button[data-action="toggle-manual-completion"]'
    }

    async acessarNotificacao() {
        // caminho para chegar até a paágina de notificações
        await this.page.click('#user-menu-toggle')
        await this.page.click('.dropdown-item:has-text("Preferências")')
        await this.page.click('a:has-text("Preferências de notificação")')
    }

//     async alterarSwitch(canal) {
//     const linha = this.page.locator('tr', { hasText: 'Notificações de tarefa' });
//     const oSwitch = linha.locator(`label.custom-control-label[title*='via "${canal}"']`);

//     await oSwitch.scrollIntoViewIfNeeded();

//     // 1. Clicamos usando o dispatchEvent (que você já viu que funciona)
//     await oSwitch.dispatchEvent('click');

//     // 2. Em vez do expect que falhou, vamos dar um tempo para o Moodle respirar
//     // Isso garante que o comando de salvar chegou no servidor antes do F5
//     await this.page.waitForTimeout(2000); 
// }

    async alterarSwitch(canal) {
    const sufixoId = (canal === 'Web') ? "popup" : "email";

    // 1. Primeiro, achamos a linha específica de "Notificações de tarefa"
    const linhaTarefa = this.page.locator('tr', { hasText: 'Notificações de tarefa' });

    // 2. Agora, buscamos o label (switch) que está DENTRO dessa linha
    // O filter garante que pegamos o label que tem o ID correto para aquele canal
    const oSwitch = linhaTarefa.locator(`label[for$="_notification_${sufixoId}"]`);

    // 3. Agora o Playwright não vai se confundir, pois só existe UM desse dentro daquela linha
    await oSwitch.scrollIntoViewIfNeeded();
    await oSwitch.dispatchEvent('click');
    
    await this.page.waitForTimeout(2000); // Tempo para o Moodle salvar
}

    async validarStatus(mensagem) {
    const deveEstarLigado = mensagem.includes("ON");
    // Se a mensagem tem OFF, buscamos o sufixo 'email', senão 'popup' (Web)
    const sufixo = mensagem.includes("OFF") ? "email" : "popup";

    // 1. ACHAMOS A LINHA ESPECÍFICA (O Pulo do Gato)
    const linhaTarefa = this.page.locator('tr', { hasText: 'Notificações de tarefa' });

    // 2. BUSCAMOS O INPUT SOMENTE DENTRO DESSA LINHA
    // O id$ garante que termina com o que queremos, e o locator dentro da linha evita duplicidade
    const inputReal = linhaTarefa.locator(`input[id$="_notification_${sufixo}"]`);

    // 3. AGORA A VALIDAÇÃO NÃO VAI DAR ERRO DE '3 ELEMENTS'
    if (deveEstarLigado) {
        await expect(inputReal).toBeChecked({ timeout: 10000 });
    } else {
        await expect(inputReal).not.toBeChecked({ timeout: 10000 });
    }
}
}
module.exports = NotificacaoPage;