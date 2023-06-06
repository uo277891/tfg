import express, {Router} from 'express';

const expressPr = require('express')
const api:Router = expressPr.Router()

/**
 * En esta clase se vinculan los métodos los controladores con la ruta específica para poder ser llamada desde el frontend
 */
import {inicioSesion, insertarUsuario, getUsuario, getUsuarioByName, updateUsuario, getUsuariosByName, 
  getUsuarios, updateFoto, getUsuariosByCountry, getUsuariosByTipoUsuario, getUsuariosByNameAndId,
  getUsuariosByGenero, getUsuariosByFecha, getUsuariosByIdInDate, eliminarUsuario, reCaptchaGoogle, getUsuariosByFilters} from "../controllers/usuarioController"

api.post(
    "/usuario/login",
    inicioSesion
);

api.post(
  "/usuario/captcha",
  reCaptchaGoogle
);

api.post(
  "/usuario/register",
  insertarUsuario
);

api.delete(
  "/usuario/delete/",
  eliminarUsuario
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
  "/usuario/getusuarios/filter/:idUsu/:name",
  getUsuariosByNameAndId
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
  "/usuario/getusuario/filter/:tipoUsu/:country/:fechaInicio/:fechaFin/:genero",
  getUsuariosByFilters
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
