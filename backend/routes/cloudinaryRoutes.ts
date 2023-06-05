import express, {Router} from 'express';
const expressPr = require('express')
const api:Router = expressPr.Router()

const {getSignature, borrarPublicacion, borrarPublicaciones} = require("../controllers/cloudinaryController") 

api.get(
  "/cloudinary/signature/:idUser",
  getSignature
);

api.get(
  "/cloudinary/publicacion/delete/:idPub",
  borrarPublicacion
);

api.get(
  "/cloudinary/publicaciones/delete/:idPubs",
  borrarPublicaciones
);

module.exports = api;
