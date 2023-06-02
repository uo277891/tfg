import express, {Router} from 'express';
const expressPr = require('express')
const api:Router = expressPr.Router()

const {insertarComentario, getComentarios, insertarRespuestaComentario, getRespuestaComentario, eliminarComentariosPublicacion, eliminarComentariosUsuario} = require("../controllers/comentarioController")

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

module.exports = api;
