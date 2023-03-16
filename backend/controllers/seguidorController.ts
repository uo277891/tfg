import { Request, Response } from 'express';

const seguidorModel = require('../models/seguidoresModel');

const getSeguidores = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id_usuario = req.params.idUsu;
      const seguidores = await seguidorModel.find({id_usuario: id_usuario});
      if(seguidores === null){
        return res.status(200).json({ seguidores: [] });
      }
      else{
        return res.status(200).json({ seguidores: seguidores });
      } 
    } catch (error) {
      return res.status(500).send(error);
    }
}

module.exports = {getSeguidores}