Feature: Escenarios para el registro

Scenario: Intertar registro con nombre en uso
    Given Datos con nombre en uso
    When Introduce datos y procede a registrarse
    Then El sistema indica que el nombre está en uso

Scenario: Intertar registro sin introducir nombre
    Given Datos sin nombre
    When Introduce datos y procede a registrarse
    Then El sistema indica que hay campos sin completar

Scenario: Intertar registro con contraseñas diferentes
    Given Datos con contraseñas diferentes
    When Introduce datos y procede a registrarse
    Then El sistema indica que las contraseñas no coinciden

Scenario: Intertar registro con nombre con espacios
    Given Datos con nombre con espacios
    When Introduce datos y procede a registrarse
    Then El sistema indica que el nombre no es válido

Scenario: Intertar registro con contraseña menor a 8 caracteres
    Given Datos con contraseña menor a 8 caracteres
    When Introduce datos y procede a registrarse
    Then El sistema indica que la contraseña es muy corta