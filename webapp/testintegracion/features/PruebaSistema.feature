Feature: Prueba de sistema

Scenario: Realizar el ciclo de crear una publicación y eliminarla
    Given Usuario identificado
    When Se crea la publicacion
    Then El sistema la muestra en el perfil del usuario (después se elimina)