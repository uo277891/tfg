import { Request, Response } from 'express';

const comentarioModel = require('../models/comentariosModel');

const insertarComentario = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {id_publicacion, id_usu_coment, texto} = req.body;
      const fecha = new Date((new Date().setHours(new Date().getHours() - (new Date().getTimezoneOffset() / 60))))
      const comentarioAInsertar = new comentarioModel({id_publicacion, id_usu_coment, texto, fecha})
      comentarioAInsertar.save();
      return res.status(200).json({insertado: true});
    } catch (error) {
      return res.status(500).json({insertado: false});
    }
}

const insertarRespuestaComentario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {id_comment, id_usu_coment, id_usu_respond, texto} = req.body;
    const fecha = new Date((new Date().setHours(new Date().getHours() - (new Date().getTimezoneOffset() / 60))))
    const comentarioAInsertar = new comentarioModel({id_usu_coment, texto, fecha, id_comment, id_usu_respond})
    comentarioAInsertar.save();
    return res.status(200).json({insertado: true});
  } catch (error) {
    return res.status(500).json({insertado: false});
  }
}

const getComentarios = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_publicacion = req.params.idPub;
    const comentarios = await comentarioModel.find({id_publicacion: id_publicacion}).sort({fecha: -1});
    return res.status(200).json({ comentarios: comentarios });
  } catch (error) {
    return res.status(500).send(error);
  }
}

const getRespuestaComentario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_comment = req.params.idCom;
    const comentarios = await comentarioModel.find({id_comment: id_comment}).sort({fecha: -1});
    return res.status(200).json({ comentarios: comentarios });
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = {insertarComentario, getComentarios, insertarRespuestaComentario, getRespuestaComentario}