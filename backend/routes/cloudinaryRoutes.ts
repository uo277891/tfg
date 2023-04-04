import express, {Router} from 'express';
const api:Router = express.Router()

const {getSignature, borrarPublicacion} = require("../controllers/cloudinaryController") 

api.get(
  "/cloudinary/signature/:idUser",
  getSignature
);

api.get(
  "/cloudinary/publicacion/delete/:idPub",
  borrarPublicacion
);

module.exports = api;
