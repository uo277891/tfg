import { Request, Response } from 'express';

var cloudinary = require('cloudinary');

require("dotenv").config();

 cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET
 });

const getSignature = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idUser = req.params.idUser
      await cloudinary.v2.uploader.destroy('perfiles/' + idUser);
      return res.status(200).json("Todo ok");
    } catch (error) {
      return res.status(500).send(error);
    }
  }

const borrarPublicacion = async (req: Request, res: Response): Promise<Response> => {
    try {
      const idPub = req.params.idPub
      await cloudinary.v2.uploader.destroy('publicaciones/' + idPub);
      return res.status(200).json("Todo ok");
    } catch (error) {
      return res.status(500).send(error);
    }
  }
  
  module.exports = {getSignature, borrarPublicacion}