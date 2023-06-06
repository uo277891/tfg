import express, {Router} from 'express';
const expressPr = require('express')
const api:Router = expressPr.Router()

/**
 * En esta clase se vinculan los métodos los controladores con la ruta específica para poder ser llamada desde el frontend
 */
import {insertarComentario, getComentarios, insertarRespuestaComentario, getRespuestaComentario, eliminarComentariosPublicacion, eliminarComentariosUsuario, eliminarComentario} from "../controllers/comentarioController"

api.post(
  "/comentarios/new",
  insertarComentario
);

api.post(
  "/comentarios/respond/new",
  insertarRespuestaComentario
);

api.get(
  "/comentarios/getcomentarios/:idPub",
  getComentarios
);

api.get(
  "/comentarios/getcomentariosrespuesta/:idCom",
  getRespuestaComentario
);

api.delete(
  "/comentarios/eliminar/:idPub",
  eliminarComentariosPublicacion
);

api.delete(
  "/comentarios/eliminar/",
  eliminarComentariosUsuario
);

api.delete(
  "/comentario/eliminar/",
  eliminarComentario
);

module.exports = api;
