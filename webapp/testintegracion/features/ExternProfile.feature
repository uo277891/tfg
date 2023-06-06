Feature: Escenarios para perfil propio

Scenario: Intertar seguir a un usuario
    Given Usuario identificado y página de otro usuario
    When Pulsar el botón para seguir
    Then El sistema seguirá al usuario