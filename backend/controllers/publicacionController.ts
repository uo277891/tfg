import { Request, Response } from 'express';

const publicacionModel = require('../models/publicacionModel');

const comentarioModel = require('../models/comentariosModel');

const getPublicaciones = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id_usuario = req.params.idUsu;
      const orden = req.params.order;
      var publicaciones;
      if(orden === "fecha")
        publicaciones = await publicacionModel.find({id_usuario: id_usuario}).sort({fecha: -1});
      else
        publicaciones = await publicacionModel.find({id_usuario: id_usuario}).sort({likes: -1});
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

const getPublicacionesByTipo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_usuario = req.params.idUsu;
    const tipo = req.params.tipo;
    const orden = req.params.fecha;
    var publicaciones;
    if(orden === "fecha")
      publicaciones = await publicacionModel.find({id_usuario: id_usuario, tipo_multimedia: tipo}).sort({fecha: -1});
    else
      publicaciones = await publicacionModel.find({id_usuario: id_usuario, tipo_multimedia: tipo}).sort({likes: -1});
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
    const {texto, id_usuario, enlace_multimedia, tipo_multimedia} = req.body;
    const fecha = new Date((new Date().setHours(new Date().getHours() - (new Date().getTimezoneOffset() / 60))))
    const likes: String[] = []
    const publicacionAInsertar = new publicacionModel({texto, id_usuario, enlace_multimedia, tipo_multimedia, fecha, likes})
    publicacionAInsertar.save();
    return res.status(200).json({pub: publicacionAInsertar});
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

const eliminarPublicacion = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_usu = req.body.idUser;
    const id_pub = req.body.idPub;
    const publicacionAsociada = await publicacionModel.findOne({_id: id_pub});
    if(id_usu !== publicacionAsociada.id_usuario)
      return res.status(400).json();
    const seBorra = await publicacionModel.deleteOne({_id: id_pub, id_usuario: id_usu});
    await comentarioModel.deleteMany({id_publicacion: id_pub});
    if(seBorra.deletedCount === 1){
      return res.status(200).json({ borrado: true });
    }
    else{
      return res.status(200).json({ borrado: false });
    } 
  } catch (error) {
    return res.status(500).send(error);
  }
}

const updatePublicacion = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_publicacion = req.params.idPub;
    const datosNuevos = req.body;
    const publicacionAsociado = await publicacionModel.findOne({_id: id_publicacion});
    if(publicacionAsociado === null){
      return res.status(400).json({actualizado: false});
    }
    else{
      await publicacionModel.findByIdAndUpdate(id_publicacion, datosNuevos)
      return res.status(200).json({actualizado: true});
    }

  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = {getPublicaciones, insertarPublicacion, getPublicacion, actualizarLikes, eliminarPublicacion, updatePublicacion, getPublicacionesByTipo}