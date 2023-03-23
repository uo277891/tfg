import { Request, Response } from 'express';

const publicacionModel = require('../models/publicacionModel');

const getPublicaciones = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id_usuario = req.params.idUsu;
      const publicaciones = await publicacionModel.find({id_usuario: id_usuario});
      if(publicaciones === null){
        return res.status(200).json({ publicaciones: [] });
      }
      else{
        return res.status(200).json({ publicaciones: publicaciones });
      } 
    } catch (error) {
      return res.status(500).send(error);
    }
}

const insertarPublicacion = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {texto, id_usuario} = req.body;

    const enlace_foto = ""
    const enlace_audio = ""
    const fecha = Date.now()
    const likes: String[] = []
    const publicacionAInsertar = new publicacionModel({texto, id_usuario, enlace_audio, enlace_foto, fecha, likes})
    publicacionAInsertar.save();
    return res.status(200).json();
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = {getPublicaciones, insertarPublicacion}