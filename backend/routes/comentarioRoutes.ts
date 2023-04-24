import express, {Router} from 'express';
const api:Router = express.Router()

const {insertarComentario, getComentarios, insertarRespuestaComentario, getRespuestaComentario} = require("../controllers/comentarioController")

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

module.exports = api;
