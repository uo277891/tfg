import { Request, Response } from 'express';

var cloudinary = require('cloudinary');

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Elimina la foto de perfil de un usuario
 * @param req Request
 * @param res Response
 * @returns 200 si ha eliminado la foto o 500 si no la ha podido eliminar
 */
const getSignature = async (req: Request, res: Response): Promise<Response> => {
  try {
    const idUser = req.params.idUser
    await cloudinary.v2.uploader.destroy('perfiles/' + idUser);
    return res.status(200).json("Todo ok");
  } catch (error) {
    return res.status(500).send(error);
  }
}

/**
 * Elimina la multimedia asociada a una publicación
 * @param req Request
 * @param res Response
 * @returns 200 si ha eliminado la multimedia o 500 si no la ha podido eliminar
 */
const borrarPublicacion = async (req: Request, res: Response): Promise<Response> => {
  try {
    const idPub = req.params.idPub
    await cloudinary.v2.uploader.destroy('publicaciones/' + idPub);
    return res.status(200).json("Todo ok");
  } catch (error) {
    return res.status(500).send(error);
  }
}

/**
 * Elimina la multimedia asociada a varias publicaciones
 * @param req Request
 * @param res Response
 * @returns 200 si ha eliminado la multimedia o 500 si no la ha podido eliminar
 */
const borrarPublicaciones = async (req: Request, res: Response): Promise<Response> => {
  try {
    const idPubs = req.params.idPubs.split(',');
    let idPubsBien: string[] = []
    idPubs.map((id: string) => { idPubsBien.push("publicaciones/" + id) })
    idPubsBien.map(async (id: string) => {
      await cloudinary.v2.uploader.destroy(id);
    })
    return res.status(200).json("Todo ok");
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = { getSignature, borrarPublicacion, borrarPublicaciones }