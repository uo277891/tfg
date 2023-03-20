import express, {Router} from 'express';
const api:Router = express.Router()

const {inicioSesion, insertarUsuario, getUsuario, getUsuarioByName, updateUsuario, subirImagenPerfil} = require("../controllers/usuarioController")

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
  "/usuario/getusuario/name/:name",
  getUsuarioByName
);

api.put(
  "/usuario/profile/edit/:nombreAnterior",
  updateUsuario
);

api.post(
  "/usuario/photo",
  subirImagenPerfil
);

module.exports = api;
