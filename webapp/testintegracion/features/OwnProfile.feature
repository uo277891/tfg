Feature: Escenarios para perfil propio

Scenario: Intertar acceder para editar perfil
    Given Usuario identificado
    When Pulsar el botón para editar perfil
    Then El sistema redirigirá al usuario al perfil privado

Scenario: Intertar acceder a los detalles de una publicación
    Given Usuario identificado
    When Pulsar el botón para acceder a los detalles de una publicación
    Then El sistema redirigirá a la publicación