import { Request, Response } from 'express';

const comentarioModel = require('../models/comentariosModel');

const log = require("../config/logger")

/**
 * Inserta un comentario en la base de datos
 * @param req Request (con los datos del comentario (texto, Id de la publicación, Id del usuario))
 * @param res Response
 * @returns True si se ha podido insertar o False en caso contrario
 */
export const insertarComentario = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {id_publicacion, id_usu_coment, texto} = req.body;
      const fecha = new Date((new Date().setHours(new Date().getHours() - (new Date().getTimezoneOffset() / 60))))
      const comentarioAInsertar = new comentarioModel({id_publicacion, id_usu_coment, texto, fecha})
      await comentarioAInsertar.save();
      log.info("Código: 200 -" + " Mensaje: Comentario insertado" + " - IP: " + req.socket.remoteAddress + " - IDPub: " + id_publicacion + " - IDUsu: " + id_usu_coment)
      return res.status(200).json({insertado: true});
    } catch (error) {
      log.error("Código: 500 -" + " Mensaje: " + error + " - IP: " + req.socket.remoteAddress)
      return res.status(500).json({insertado: false});
    }
}

/**
 * Inserta una respuesta en la base de datos
 * @param req Request (con los datos de la respuesta (texto, Id de la publicación, Id del usuario, Id del comentario al que se responde e Id del usuario al que se le responde))
 * @param res Response
 * @returns True si se ha podido insertar o False en caso contrario
 */
export const insertarRespuestaComentario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {id_comment, id_publicacion, id_usu_coment, id_usu_respond, texto} = req.body;
    const fecha = new Date((new Date().setHours(new Date().getHours() - (new Date().getTimezoneOffset() / 60))))
    const comentarioAInsertar = new comentarioModel({id_publicacion, id_usu_coment, texto, fecha, id_comment, id_usu_respond})
    comentarioAInsertar.save();
    log.info("Código: 200 -" + " Mensaje: Respuesta insertada" + " - IP: " + req.socket.remoteAddress + " - IDPub: " + id_publicacion + " - IDUsu: " + id_usu_coment)
    return res.status(200).json({insertado: true});
  } catch (error) {
    log.error("Código: 500 -" + " Mensaje: " + error + " - IP: " + req.socket.remoteAddress)
    return res.status(500).json({insertado: false});
  }
}

/**
 * Devuelve los comentarios de una publicación
 * @param req Request (con el Id de la publicación)
 * @param res Response
 * @returns Lista de comentarios
 */
export const getComentarios = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_publicacion = req.params.idPub;
    const comentarios = await comentarioModel.find({id_publicacion: id_publicacion, id_usu_respond:{ "$exists" : false }}).sort({fecha: -1});
    return res.status(200).json({ comentarios: comentarios });
  } catch (error) {
    return res.status(500).send(error);
  }
}

/**
 * Devuelve las respuestas de un comentario
 * @param req Request (con el Id del comentario)
 * @param res Response
 * @returns Lista de respuestas
 */
export const getRespuestaComentario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_comment = req.params.idCom;
    const comentarios = await comentarioModel.find({id_comment: id_comment}).sort({fecha: -1});
    return res.status(200).json({ comentarios: comentarios });
  } catch (error) {
    log.error("Código: 500 -" + " Mensaje: " + error + " - IP: " + req.socket.remoteAddress)
    return res.status(500).send(error);
  }
}

/**
 * Elimina los comentarios y respuestas de una publicación de la base de datos
 * @param req Request (con el Id de la publicación)
 * @param res Response
 * @returns Código 200 si se han podido eliminar los comentarios y respuestas
 */
export const eliminarComentariosPublicacion = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_publicacion = req.params.idPub;
    await comentarioModel.deleteMany({id_publicacion: id_publicacion});
    log.info("Código: 200 -" + " Mensaje: Comentarios eliminados" + " - IP: " + req.socket.remoteAddress + " - IDPub: " + id_publicacion)
    return res.status(200).json();
  } catch (error) {
    log.error("Código: 500 -" + " Mensaje: " + error + " - IP: " + req.socket.remoteAddress)
    return res.status(500).send(error);
  }
}

/**
 * Elimina los comentarios y respuestas de un usuario de la base de datos
 * @param req Request (con el Id del usuario)
 * @param res Response
 * @returns True si se han podido eliminar los comentarios y respuestas
 */
export const eliminarComentariosUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_usuario = req.body.idUser;
    const comentarios = await comentarioModel.find({id_usu_coment: id_usuario});
    await comentarioModel.deleteMany({id_usu_coment: id_usuario});
    let id_comentarios: string[] = [];
    comentarios.map((comentario:any) => id_comentarios.push(comentario._id))
    await comentarioModel.deleteMany({id_comment: {$in: id_comentarios}});
    log.info("Código: 200 -" + " Mensaje: Comentarios de un usuario eliminados" + " - IP: " + req.socket.remoteAddress + "- IDUsu: " + id_usuario)
    return res.status(200).json({borrado: true});
  } catch (error) {
    log.error("Código: 500 -" + " Mensaje: " + error + " - IP: " + req.socket.remoteAddress)
    return res.status(500).send(error);
  }
}

/**
 * Elimina un comentario de la base de datos
 * @param req Request (con el Id del comentario)
 * @param res Response
 * @returns True si se han podido eliminar los comentarios y respuestas
 */
export const eliminarComentario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_com = req.body.idCom;
    await comentarioModel.deleteOne({_id: id_com});
    await comentarioModel.deleteMany({id_comment: id_com});
    log.info("Código: 200 -" + " Mensaje: Comentario eliminado" + " - IP: " + req.socket.remoteAddress + "- IDCom: " + id_com)
    return res.status(200).json({borrado: true});
  } catch (error) {
    log.error("Código: 500 -" + " Mensaje: " + error + " - IP: " + req.socket.remoteAddress)
    return res.status(500).send(error);
  }
}
