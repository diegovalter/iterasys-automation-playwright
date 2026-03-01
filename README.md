# 🧪 Automação de Testes - Portal Iterasys

Este projeto realiza a automação de testes de ponta a ponta (E2E) na plataforma **Iterasys**, utilizando **Playwright** e **Cucumber**. O foco é validar a jornada do aluno, desde a filtragem de cursos até a conclusão de aulas em vídeo.

---

## 📋 Funcionalidades Automatizadas

### 🔍 Filtro de Categorias
* **Cenário:** Seleção de filtros como "Formação" ou "Certificação" no catálogo.
* **Validação:** Confere se o título da página muda corretamente e se o número de cursos exibidos bate com o esperado.

### 🔔 Gestão de Notificações
* **Cenário:** O robô acessa as configurações do aluno e altera as chaves (switches) de notificações de E-mail e Web.
* **Validação:** Garante que os seletores (switches) respondem corretamente aos comandos de marcar e desmarcar.

### 🎥 Conclusão de Aula (Vimeo)
* **Cenário:** Reprodução de conteúdo em vídeo dentro de um iframe.
* **Validação:** Utiliza manipulação de tempo (`currentTime`) para simular o término da aula e validar se o sistema registra a conclusão automaticamente.

---

## 🛠️ Tecnologias Utilizadas
* **Playwright** — Automação de navegador e interação com elementos.
* **@cucumber/cucumber** — Escrita de testes em BDD (Gherkin).
* **JavaScript** — Linguagem principal do projeto.

---

## 📁 Estrutura de Pastas
```text
├── features/
│   ├── support/
│   │   ├── steps/      # Código que executa cada passo do teste
│   │   ├── pages/      # Elementos e ações de cada tela (POM)
│   │   ├── dados/      # ⚠️ Pasta ignorada pelo Git (Segurança)
│   │   └── hooks.js    # Configurações de abertura do browser
│   └── *.feature       # Cenários escritos em português (Gherkin)
├── .gitignore          # Protege dados sensíveis (usuarios.js)
├── package.json        # Dependências instaladas
└── README.md           # Documentação do projeto
```

---

## 🚀 Como Executar o Projeto

1. **Instale as dependências:**
   ```bash
   npm install
   ```


2. **Configure suas Credenciais:**
Como a pasta dados/ está no .gitignore, você deve criar o arquivo features/support/dados/usuarios.js manualmente com a seguinte estrutura:

JavaScript
```// features/support/dados/usuarios.js
module.exports = {
    aluno_real: {
        username: 'seu-email@exemplo.com',
        password: 'sua-senha'
    }
}
```
3. **Rode os testes:**
```bash
npx cucumber-js
```

---

## 🔒 Observações de Desenvolvimento
**Segurança (Gitignore):** Por questões de segurança, o arquivo usuarios.js (que contém e-mail e senha reais) está configurado no .gitignore. Isso evita o vazamento de credenciais em repositórios públicos.

**Demonstração Visual:** Configurei o Playwright para rodar com headless: false e um pequeno slowMo. Assim, é possível acompanhar visualmente cada ação do robô durante a apresentação.

**Interação com Iframes:** O teste de vídeo foi desenvolvido para interagir diretamente com o player do Vimeo dentro de um Iframe, validando o progresso da aula de forma otimizada.
