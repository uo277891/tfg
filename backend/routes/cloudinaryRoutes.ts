import express, {Router} from 'express';
const expressPr = require('express')
const api:Router = expressPr.Router()

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
