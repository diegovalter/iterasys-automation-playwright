const { Given } = require('@cucumber/cucumber')
const LoginPage = require('../pages/LoginPage')
const dados = require('../data/usuarios')

// O Login para todas as features
Given('que o aluno esta logado', async function () {
    const loginPage = new LoginPage(this.page)
    await loginPage.navegar()
    await loginPage.abrirLogin()
    await loginPage.realizarLogin(
        dados.aluno_real.username, 
        dados.aluno_real.password
    )
    
})