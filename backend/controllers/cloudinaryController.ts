import { Request, Response } from 'express';

var cloudinary = require('cloudinary');

require("dotenv").config();

 cloudinary.config({
   cloud_name: "ddtcz5fqr",
   api_key: "117284356463575",
   api_secret: "q8q-FjrQbBGYELmHAm_Fc0iGWhg"
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
  
  module.exports = {getSignature}