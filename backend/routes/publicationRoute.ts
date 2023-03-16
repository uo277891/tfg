import express, {Router} from 'express';
const api:Router = express.Router()

const {getPublicaciones} = require("../controllers/publicacionController")

api.get(
  "/publicaciones/:idUsu",
  getPublicaciones
);

module.exports = api;
