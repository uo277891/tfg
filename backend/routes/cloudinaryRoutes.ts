import express, {Router} from 'express';
const api:Router = express.Router()

const {getSignature} = require("../controllers/cloudinaryController") 

api.get(
  "/cloudinary/signature/:idUser",
  getSignature
);

module.exports = api;
