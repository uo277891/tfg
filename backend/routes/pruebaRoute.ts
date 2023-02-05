import express, {Router} from 'express';
const api:Router = express.Router()

const {getPrueba} = require("../controllers/pruebaController")

api.get(
    "/prueba",
    getPrueba
  );

module.exports = api;
