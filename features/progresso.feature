Feature: Persistencia de Progresso do Aluno

  Scenario Outline: Validar salvamento de progresso apos interrupcao
    Given que o aluno esta logado
    And acessa a pagina de uma aula de video
    When ele executa a "<acao>"
    And recarrega a pagina da aula
    Then o sistema deve garantir que o "<resultado>" seja

    Examples:
      | acao                      | resultado                       |
      | assistir 50% do video     | video retomado em 50%           |
      | assistir video ate o fim  | progresso do curso atualizado   |
      | clicar em concluir aula   | aula marcada como concluida     |