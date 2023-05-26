Feature: Escenarios para inicio de sesión

Scenario: Intertar iniciar sesión sin introducir nombre
    Given Solo la contraseña
    When Introduce datos y procede a iniciar sesión
    Then El sistema indica que faltan datos

Scenario: Intertar iniciar sesión con dupla incorrecta
    Given Dupla incorrecta
    When Introduce datos y procede a iniciar sesión
    Then El sistema indica que no coinciden los datos

Scenario: Intertar iniciar sesión con datos correctos
    Given Dupla correcta
    When Introduce datos y procede a iniciar sesión
    Then El sistema inicia sesión