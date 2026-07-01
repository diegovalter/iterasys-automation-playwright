class MeuCursoPage {
    constructor(page) {
        this.page = page
        this.iframeSeletor = 'iframe[src*="vimeo"]'
        this.videoSeletor = 'video'
        this.btnConcluirSeletor = 'button[data-action="toggle-manual-completion"]'
    }

    async irParaAula() {
        // caminho para chegar até a lista de cursos
        await this.page.click('a[role="menuitem"]:has-text("Meus cursos")')
        await this.page.click('a[title="Continuar"]')
        await this.page.click('span.instancename:has-text("Aula 1")')
    }

    async executarAcao(acao) {
        const video = this.page.frameLocator(this.iframeSeletor).locator(this.videoSeletor)

        if (acao === 'assistir 50% do video') {
            await this.page.locator(this.iframeSeletor).click().catch(() => {})
            await this.page.waitForTimeout(2000)
            // Pula para metade do vídeo
            await video.evaluate(el => { if (el.duration) el.currentTime = el.duration * 0.5; })
        } 
        else if (acao === 'assistir video ate o fim') {
            await this.page.locator(this.iframeSeletor).click().catch(() => {})
            // Pula para 2 segundos antes de acabar
            await video.evaluate(el => { if (el.duration) el.currentTime = el.duration - 2; })
            await this.page.waitForTimeout(4000)
        }
        else if (acao === 'clicar em concluir aula') {
            // Clica no botão de marcar como feito
            const btn = this.page.locator(this.btnConcluirSeletor)
            await btn.scrollIntoViewIfNeeded()
            await btn.click()
        }
        await this.page.waitForTimeout(3000) 
    }

    async validarResultado(resultado) {
        const btn = this.page.locator(this.btnConcluirSeletor)

        // CENÁRIO 1: Persistência do Vídeo
        if (resultado === 'video retomado em 50%') {
            await this.page.waitForTimeout(5000)
            const video = this.page.frameLocator(this.iframeSeletor).locator(this.videoSeletor)
            const tempoAtual = await video.evaluate(el => el.currentTime).catch(() => 0)

            if (tempoAtual < 10) {
                console.log("\n⚠️  AVISO: O sistema não salvou o progresso.")
            } else {
                console.log("\n✅ SUCESSO: O vídeo salvou a posição.")
            }
        } 

        // CENÁRIO 2: Automação (Vídeo 100%)
        else if (resultado === 'progresso do curso atualizado') {
            await this.page.waitForTimeout(3000)
            const texto = await btn.innerText()
            
            if (texto.includes('Marcar como feito')) {
                console.log("\n⚠️  AVISO: O sistema não concluiu a aula sozinho.")
            } else {
                console.log("\n✅ SUCESSO: O sistema concluiu a aula automaticamente.")
            }
        }

        // CENÁRIO 3: Clique Manual
        else if (resultado === 'aula marcada como concluida') {
            await this.page.waitForTimeout(3000)
            const texto = await btn.innerText()

            if (texto.includes('Marcar como feito')) {
                console.log("\n❌ ERRO: O clique manual não funcionou.")
            } else {
                console.log("\n✅ SUCESSO: O clique manual foi confirmado.")

                // LIMPEZA: Desmarca a aula para o teste poder rodar de novo depois
                //console.log("🧹 LIMPANDO: Desmarcando a aula para a próxima execução...");
                await btn.click();
                await this.page.waitForTimeout(2000)
            }
        }
    }
}

module.exports = MeuCursoPage