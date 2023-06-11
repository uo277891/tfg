# TFG UO277891

Este proyecto es una red social realizada como trabajo de fin de grado en la Universidad de Oviedo. Esta red social estará conectada con la API para desarrolladores de Spotify. Las tecnologías utilizadas que componen este proyecto son las siguientes.

- **TypeScript**
- **MongoDB**
- **Express**
- **React**
- **NodeJS**

El autor de este proyecto es Hugo Gutiérrez Tomás, y su correo corporativo es uo277891@uniovi.es

## Instalación

Para proceder a la instalación del sistema, se deberán tener instalados *Node.js* y *npm*. El sistema está compuesto de dos carpetas principales, webapp y backend. La primera se encargará de ejecutar las vistas del usuario (en el puerto 3000). Para ejecutar esta carpeta se deberán realizar las siguientes acciones:

```shell
npm install
npm start
```
El primer comando instala todas las dependencias asociadas a webapp y, el segundo, ejecuta la aplicación en el puerto 3000.

De la misma forma se puede ejecutar la parte referida a la lógica de negocio (backend). En este caso, el puerto es el 5000.

## Tests

Para la realización de tests, se han dispuesto de dos comandos principales

```shell
npm run test
```
Este comando ejecuta los test unitarios de webapp o de backend (dependiendo de la carpeta en la que te encuentres).

```shell
npm run test:int
```
Este comando solo está disponible en la carpeta webapp y sirve para ejecutar los tests de integración del sistema.

## Generación de documentación

La carpeta *docs* de webapp y backend proporciona un acceso a los métodos comentados de las clases. En caso de modificaciones en estos métodos o agregación de nuevos, se puede actualizar dicha carpeta con el siguiente comando (dependiendo de si se ejecuta en webapp o backend, cambiará solo el contenido de la carpeta *docs* que se encuentre en dicha carpeta):

```shell
npx typedoc
```
