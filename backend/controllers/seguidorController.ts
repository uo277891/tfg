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

const isSeguidor = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_usuario = req.params.idUsu;
    const id_seguidor = req.params.idSeg;
    const seguidores = await seguidorModel.findOne({id_usuario: id_usuario, id_seguidor: id_seguidor});
    if(seguidores === null){
      return res.status(200).json({ isSeguidor: false });
    }
    else{
      return res.status(200).json({ isSeguidor: true });
    } 
  } catch (error) {
    return res.status(500).send(error);
  }
}

const seguir = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_usuario = req.body.idUser;
    const id_seguidor = req.body.idSeg;
    const fecha = Date.now()
    const seguidorAInsertar = new seguidorModel({id_usuario, id_seguidor, fecha})
    seguidorAInsertar.save();
    return res.status(200).json({seguidor: true});
  } catch (error) {
    return res.status(500).send(error);
  }
}

const dejarDeSeguir = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_usuario = req.body.idUser;
    const id_seguidor = req.body.idSeg;
    const seBorra = await seguidorModel.deleteOne({id_usuario: id_usuario, id_seguidor: id_seguidor});
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

const getFollowingUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_usuario = req.params.idUser;
    const users = await seguidorModel.find({id_seguidor: id_usuario});
    var listaIds: String[] = []
    users.map((user: any) => {
      listaIds.push(user.id_usuario)
    })
    return res.status(200).json({ followUsers: listaIds });
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = {getSeguidores, isSeguidor, dejarDeSeguir, seguir, getFollowingUsers}