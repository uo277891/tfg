Feature: Escenarios para buscar usuarios

Scenario: Intertar buscar usuarios por nombre
    Given Usuario identificado y nombre a buscar
    When Escribir el nombre y darle a buscar
    Then El sistema muestra todos las usuario que contengan la cadena del nombre

Scenario: Intertar buscar usuarios por filtro
    Given Usuario identificado
    When Aplicar el filtro de edad
    Then El sistema muestra todos las usuario que estén en el rango de edad