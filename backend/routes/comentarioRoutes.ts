import express, {Router} from 'express';
const api:Router = express.Router()

const {insertarComentario, getComentarios} = require("../controllers/comentarioController")

api.post(
  "/comentarios/new",
  insertarComentario
);

api.get(
  "/comentarios/getcomentarios/:idPub",
  getComentarios
);

module.exports = api;
