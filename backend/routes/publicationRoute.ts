import express, {Router} from 'express';
const expressPr = require('express')
const api:Router = expressPr.Router()

/**
 * En esta clase se vinculan los métodos los controladores con la ruta específica para poder ser llamada desde el frontend
 */
import {getPublicaciones, insertarPublicacion, getPublicacion, actualizarLikes, eliminarPublicacion, updatePublicacion, getPublicacionesByTipo, getPublicacionesWithLimit, eliminarPublicacionesUsuario} from"../controllers/publicacionController"

api.get(
  "/publicaciones/getpublicacion/:idUsu/:order",
  getPublicaciones
);

api.get(
  "/publicaciones/getpublicacion/:idPub",
  getPublicacion
);

api.get(
  "/publicaciones/getpublicacion/tipo/:idUsu/:tipo/:fecha",
  getPublicacionesByTipo
);

api.get(
  "/publicaciones/getpublicacionskip/:skip",
  getPublicacionesWithLimit
);

api.post(
  "/publicaciones/new",
  insertarPublicacion
);

api.put(
  "/publicaciones/updatelikes",
  actualizarLikes
);

api.put(
  "/publicacion/update/:idPub",
  updatePublicacion
);

api.delete(
  "/publicacion/delete",
  eliminarPublicacion
);

api.delete(
  "/publicacion/delete/usuario/",
  eliminarPublicacionesUsuario
);

module.exports = api;
