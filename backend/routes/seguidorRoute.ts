import express, {Router} from 'express';
const api:Router = express.Router()

const {getSeguidores, isSeguidor, dejarDeSeguir, seguir} = require("../controllers/seguidorController")

api.get(
  "/seguidores/:idUsu",
  getSeguidores
);

api.get(
  "/seguidores/isSeguidor/:idUsu/:idSeg",
  isSeguidor
);

api.post(
  "/seguidores/follow/",
  seguir
);

api.delete(
  "/seguidores/unfollow/",
  dejarDeSeguir
);

module.exports = api;
