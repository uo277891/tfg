import express, {Router} from 'express';
const api:Router = express.Router()

const {insertarComentario} = require("../controllers/comentarioController")

api.post(
  "/comentarios/new",
  insertarComentario
);

module.exports = api;
