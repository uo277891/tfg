import { Request, Response } from 'express';

const comentarioModel = require('../models/comentariosModel');

const insertarComentario = async (req: Request, res: Response): Promise<Response> => {
    try {
      const {id_publicacion, id_usu_coment, texto} = req.body;
      const fecha = Date.now()
      const comentarioAInsertar = new comentarioModel({id_publicacion, id_usu_coment, texto, fecha})
      comentarioAInsertar.save();
      return res.status(200).json();
    } catch (error) {
      return res.status(500).send(error);
    }
}

module.exports = {insertarComentario}