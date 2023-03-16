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

module.exports = {getPublicaciones}