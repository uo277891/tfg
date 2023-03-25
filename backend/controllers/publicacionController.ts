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

const getPublicacion = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_publicacion = req.params.idPub;
    const publicacion = await publicacionModel.findOne({_id: id_publicacion});
    return res.status(200).json({ publicacion: publicacion });
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

const actualizarLikes = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_pub = req.body.id_publication;
    const publicacionAsociada = await publicacionModel.findOne({_id: id_pub});
    publicacionAsociada.likes = req.body.likes;
    if(publicacionAsociada === null){
      return res.status(400).json("No se ha encontrado la publicacion");
    }
    else{
      await publicacionModel.findByIdAndUpdate(id_pub, publicacionAsociada)
      return res.status(200).json("Likes actualizados");
    }

  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = {getPublicaciones, insertarPublicacion, getPublicacion, actualizarLikes}