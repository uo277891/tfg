import { Request, Response } from 'express';

var cloudinary = require('cloudinary');

require("dotenv").config();

const log = require("../config/logger")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Elimina la foto de perfil de un usuario
 * @param req Request (con el Id del usuario)
 * @param res Response
 * @returns 200 si ha eliminado la foto o 500 si no la ha podido eliminar
 */
export const getSignature = async (req: Request, res: Response): Promise<Response> => {
  try {
    const idUser = req.params.idUser
    await cloudinary.v2.uploader.destroy('perfiles/' + idUser);
    log.info("Código: 200 -" + " Mensaje: Foto de perfil eliminada" + " - IP: " + req.socket.remoteAddress + " - IDPub: " + idUser)
    return res.status(200).json("Todo ok");
  } catch (error) {
    log.error("Código: 500 -" + " Mensaje: " + error + " - IP: " + req.socket.remoteAddress)
    return res.status(500).send(error);
  }
}

/**
 * Elimina la multimedia asociada a una publicación
 * @param req Request (con el Id de la publicación)
 * @param res Response
 * @returns 200 si ha eliminado la multimedia o 500 si no la ha podido eliminar
 */
export const borrarPublicacion = async (req: Request, res: Response): Promise<Response> => {
  try {
    const idPub = req.params.idPub
    await cloudinary.v2.uploader.destroy('publicaciones/' + idPub);
    log.info("Código: 200 -" + " Mensaje: Multimedia de publicación eliminada" + " - IP: " + req.socket.remoteAddress + " - IDPub: " + idPub)
    return res.status(200).json("Todo ok");
  } catch (error) {
    log.error("Código: 500 -" + " Mensaje: " + error + " - IP: " + req.socket.remoteAddress)
    return res.status(500).send(error);
  }
}

/**
 * Elimina la multimedia asociada a varias publicaciones
 * @param req Request (con la lista de Ids de las publicaciones)
 * @param res Response
 * @returns 200 si ha eliminado la multimedia o 500 si no la ha podido eliminar
 */
export const borrarPublicaciones = async (req: Request, res: Response): Promise<Response> => {
  try {
    const idPubs = req.params.idPubs.split(',');
    let idPubsBien: string[] = []
    idPubs.map((id: string) => { idPubsBien.push("publicaciones/" + id) })
    idPubsBien.map(async (id: string) => {
      await cloudinary.v2.uploader.destroy(id);
    })
    log.info("Código: 200 -" + " Mensaje: Toda la multimedia de un usuario eliminada" + " - IP: " + req.socket.remoteAddress)
    return res.status(200).json("Todo ok");
  } catch (error) {
    log.error("Código: 500 -" + " Mensaje: " + error + " - IP: " + req.socket.remoteAddress)
    return res.status(500).send(error);
  }
}