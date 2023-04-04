import express, {Router} from 'express';
const api:Router = express.Router()

const {inicioSesion, insertarUsuario, getUsuario, getUsuarioByName, updateUsuario, getUsuariosByName, getUsuarios, updateFoto} = require("../controllers/usuarioController")

api.post(
    "/usuario/login",
    inicioSesion
);

api.post(
  "/usuario/register",
  insertarUsuario
);

api.get(
  "/usuario/getusuario/:id_user",
  getUsuario
);

api.get(
  "/usuario/getusuarios/:id_user",
  getUsuarios
);

api.get(
  "/usuario/getusuario/name/:name",
  getUsuarioByName
);

api.get(
  "/usuario/find/:name",
  getUsuariosByName
);

api.put(
  "/usuario/profile/edit/:nombreAnterior",
  updateUsuario
);

api.put(
  "/usuario/edit/:nombre",
  updateFoto
);

module.exports = api;
