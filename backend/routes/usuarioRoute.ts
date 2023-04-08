import express, {Router} from 'express';
const api:Router = express.Router()

const {inicioSesion, insertarUsuario, getUsuario, getUsuarioByName, updateUsuario, getUsuariosByName, 
  getUsuarios, updateFoto, getUsuariosByCountry, getUsuariosByTipoUsuario, getUsuariosByGenero, getUsuariosByFecha, getUsuariosByIdInDate} = require("../controllers/usuarioController")

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
  "/usuario/getusuario/country/:country",
  getUsuariosByCountry
);

api.get(
  "/usuario/getusuario/tipo/:tipoUsu",
  getUsuariosByTipoUsuario
);

api.get(
  "/usuario/getusuario/genero/:genero",
  getUsuariosByGenero
);

api.get(
  "/usuario/getusuario/fecha/:fechaInicio/:fechaFin",
  getUsuariosByFecha
);

api.get(
  "/usuario/find/:name",
  getUsuariosByName
);

api.get(
  "/usuario/getusuario/id/fecha/:idUser/:fechaInicio/:fechaFin",
  getUsuariosByIdInDate
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
