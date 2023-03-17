import express, {Router} from 'express';
const api:Router = express.Router()

const {getPublicaciones, insertarPublicacion} = require("../controllers/publicacionController")

api.get(
  "/publicaciones/:idUsu",
  getPublicaciones
);

api.post(
  "/publicaciones/new",
  insertarPublicacion
);

module.exports = api;
