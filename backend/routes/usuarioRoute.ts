import express, {Router} from 'express';
const api:Router = express.Router()

const {inicioSesion, insertarUsuario} = require("../controllers/usuarioController")

api.post(
    "/usuario/login",
    inicioSesion
  );

  api.post(
    "/usuario/register",
    insertarUsuario
  );

module.exports = api;
