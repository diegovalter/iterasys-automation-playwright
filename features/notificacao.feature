Feature: Preferencias de Notificacao

  Scenario Outline: Validar se o sistema respeita as configuracoes definidas
    Given que o aluno esta logado
    And acessa a pagina de preferencias de notificacao
    When ele altera o switch do "<canal>" para "<status>"
    And recarrega a pagina
    Then o sistema deve garantir que o status do "<resultado>" seja

    Examples:
      | canal   | status    | resultado				                    |
      | Web     | ON	    | O switch deve permanecer na posição ON	|
      | E-mail  | OFF	    | O switch deve permanecer na posição OFF	|
