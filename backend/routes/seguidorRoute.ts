import express, {Router} from 'express';
const api:Router = express.Router()

const {getSeguidores} = require("../controllers/seguidorController")

api.get(
  "/seguidores/:idUsu",
  getSeguidores
);

module.exports = api;
