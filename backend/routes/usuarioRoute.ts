import express, {Router} from 'express';
const api:Router = express.Router()

const {getUsuarioByName} = require("../controllers/usuarioController")

api.get(
    "/usuario/nombre/:nombre",
    getUsuarioByName
  );

module.exports = api;
