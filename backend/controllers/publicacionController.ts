import { Request, Response } from 'express';

const publicacionModel = require('../models/publicacionModel');

const comentarioModel = require('../models/comentariosModel');

/**
 * Devuelve las publicaciones de un usuario en un orden específico
 * @param req Request (con el Id del usuario y la ordenación a seguir (por fecha de publicación o por número de me gustas))
 * @param res Response
 * @returns Lista de publicaciones
 */
export const getPublicaciones = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id_usuario = req.params.idUsu;
      const orden = req.params.order;
      var publicaciones;
      if(orden === "fecha")
        publicaciones = await publicacionModel.find({id_usuario: id_usuario}).sort({fecha: -1});
      else{
        publicaciones = await publicacionModel.aggregate([  {$match: { id_usuario: id_usuario }}, { $addFields:{ len:{$size:"$likes"}}}, {$sort:{len:-1}}])
      }
      if(publicaciones === null){
        return res.status(200).json({ publicaciones: [] });
      }
      else{
        return res.status(200).json({ publicaciones: publicaciones });
      } 
    } catch (error) {
      console.log(error)
      return res.status(500).send(error);
    }
}

/**
 * Devuelve las publicaciones de un usuario en un orden y de con un tipo específico (publicaciones de texto, audio o imagen)
 * @param req Request (con el Id del usuario y la ordenación a seguir (por fecha de publicación o por número de me gustas) y tipo de publicación)
 * @param res Response
 * @returns Lista de publicaciones
 */
export const getPublicacionesByTipo = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_usuario = req.params.idUsu;
    const tipo = req.params.tipo;
    const orden = req.params.fecha;
    var publicaciones;
    if(orden === "fecha")
      publicaciones = await publicacionModel.find({id_usuario: id_usuario, tipo_multimedia: tipo}).sort({fecha: -1});
    else
      publicaciones = await publicacionModel.aggregate([  {$match: { id_usuario: id_usuario, tipo_multimedia: tipo }}, { $addFields:{ len:{$size:"$likes"}}}, {$sort:{len:-1}}])
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

/**
 * Devuelve la publicación asociada a un Id
 * @param req Request (con el Id de la publicación)
 * @param res Response
 * @returns Publicación asociada
 */
export const getPublicacion = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_publicacion = req.params.idPub;
    const publicacion = await publicacionModel.findOne({_id: id_publicacion});
    return res.status(200).json({ publicacion: publicacion });
  } catch (error) {
    return res.status(500).send(error);
  }
}

/**
 * Inserta una publicación en la base de datos
 * @param req Request (con los datos de la publicación (texto, Id del usuario, enlace a la multimedia y tipo de publicación))
 * @param res Response
 * @returns Publicación creada
 */
export const insertarPublicacion = async (req: Request, res: Response): Promise<Response> => {
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

/**
 * Actualiza los me gusta de una publicación en la base de datos
 * @param req Request (con el Id de la publicación y los me gusta actualizados)
 * @param res Response
 * @returns Código 200 en caso de que se hayan actualizado los me gustas
 */
export const actualizarLikes = async (req: Request, res: Response): Promise<Response> => {
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

/**
 * Elimina una publicación (junto con los comentarios de esta) en la base de datos
 * @param req Request (con el Id de la publicación y el Id del usuario)
 * @param res Response
 * @returns True si se ha podido eliminar o False en caso contrario
 */
export const eliminarPublicacion = async (req: Request, res: Response): Promise<Response> => {
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

/**
 * Elimina todas las publicaciones de un usuario en la base de datos
 * @param req Request (con el Id del usuario)
 * @param res Response
 * @returns True si se ha podidos eliminar las publicaciones
 */
export const eliminarPublicacionesUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_usu = req.body.idUser;
    await publicacionModel.deleteMany({id_usuario: id_usu});
    return res.status(200).json({ borrado: true });
  } catch (error) {
    return res.status(500).send(error);
  }
}

/**
 * Actualiza los datos de una publicación en la base de datos
 * @param req Request (con el Id de la publicación y los datos que se deben actualizar)
 * @param res Response
 * @returns True si se ha podido actualizar o False en caso contrario
 */
export const updatePublicacion = async (req: Request, res: Response): Promise<Response> => {
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

/**
 * Devuelve 10 publicaciones y se salta las especificadas en el parámetro
 * @param req Request (con el número de publicaciones a saltar)
 * @param res Response
 * @returns Lista de publicaciones
 */
export const getPublicacionesWithLimit = async (req: Request, res: Response): Promise<Response> => {
  try {
    
    const skip = req.params.skip;

    const publicaciones = await publicacionModel.find().skip(skip).limit(10).sort({fecha: -1});
    if(publicaciones === null){
      return res.status(200).json({ publicaciones: [] });
    }
    else{
      return res.status(200).json({ publicaciones: publicaciones });
    } 
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
}
