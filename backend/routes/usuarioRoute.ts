import express, {Router} from 'express';
const api:Router = express.Router()

const {getUsuarioByName, insertarUsuario} = require("../controllers/usuarioController")

api.get(
    "/usuario/nombre/:nombre",
    getUsuarioByName
  );

  api.post(
    "/usuario/insertar",
    insertarUsuario
  );

module.exports = api;
