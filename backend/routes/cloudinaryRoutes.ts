import express, {Router} from 'express';
const expressPr = require('express')
const api:Router = expressPr.Router()

/**
 * En esta clase se vinculan los métodos los controladores con la ruta específica para poder ser llamada desde el frontend
 */
import {getSignature, borrarPublicacion, borrarPublicaciones} from "../controllers/cloudinaryController"

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
