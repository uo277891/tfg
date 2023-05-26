Feature: Escenarios para detalles de una publicación

Scenario: Intertar dar me gusta a una publicacion
    Given Usuario identificado
    When Dar me gusta a la publicación
    Then El sistema actualiza la lista de me gustas
