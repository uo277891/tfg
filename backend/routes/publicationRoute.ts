import express, {Router} from 'express';
const api:Router = express.Router()

const {getPublicaciones, insertarPublicacion, getPublicacion, actualizarLikes, eliminarPublicacion, updatePublicacion} = require("../controllers/publicacionController")

api.get(
  "/publicaciones/:idUsu",
  getPublicaciones
);

api.get(
  "/publicaciones/getpublicacion/:idPub",
  getPublicacion
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

module.exports = api;
