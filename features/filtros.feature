Feature: Filtros de Categoria

  #@categorias
  Scenario Outline: Validar filtragem de cursos por categoria
    Given que o aluno esta logado
    And acessa a pagina inicial de cursos
    When ele seleciona a "<categoria>" no menu de filtros
    Then o sistema deve atualizar a "<lista>" de cursos
    And verifico que o resultado exibe "<resultado>"

    Examples:
      | categoria           | lista       | resultado |
      | Todas as categorias | Iterasys    | 55        |
      | Formação            | Formação    | 50        |
      | Certificação        | Certificação| 5         |

#   @ordenacao
#   Scenario Outline: Validar ordenação dos títulos
#     Given que o aluno está logado
#     And acessa a página inicial de cursos
#     When ele escolhe "<tipo_ordenacao>" no filtro
#     Then os títulos devem ser organizados em "<resultado_esperado>"
#     And verifico se o primeiro curso da lista condiz com a ordenação

#     Examples:
#       | tipo_ordenacao | resultado_esperado            |
#       | Ordenar A a Z  | ordem alfabética crescente    |
#       | Ordenar Z a A  | ordem alfabética decrescente  |

#   @persistencia
#   Scenario Outline: Validar manutenção da ordenação após troca de categoria
#     Given que o aluno está logado
#     And acessa a página inicial de cursos
#     And aplicou a ordenação "<ordenacao>" na lista atual
#     When ele troca para a "<categoria_alvo>"
#     Then o sistema deve garantir que "<resultado_esperado>"

#     Examples:
#       | ordenacao | categoria_alvo | resultado_esperado                                       |
#       | Z a A     | Certificação   | o sistema mantém a ordenação Z a A para a nova categoria |
#       | A a Z     | Mês 01         | o sistema mantém a ordenação A a Z para a nova categoria |