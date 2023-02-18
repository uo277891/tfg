import express, {Router} from 'express';
const api:Router = express.Router()

const {inicioSesion, insertarUsuario, getUsuario, updateUsuario} = require("../controllers/usuarioController")

api.post(
    "/usuario/login",
    inicioSesion
  );

api.post(
  "/usuario/register",
  insertarUsuario
);

api.get(
  "/usuario/getusuario/:nombre",
  getUsuario
);

api.put(
  "/usuario/profile/edit/:nombreAnterior",
  updateUsuario
);

module.exports = api;
