import { Request, Response } from 'express';

const seguidorModel = require('../models/seguidoresModel');

const log = require("../config/logger")

/**
 * Devuelve los seguidores de un usuario
 * @param req Request (con el Id del usuario)
 * @param res Response
 * @returns Lista de seguidores
 */
export const getSeguidores = async (req: Request, res: Response): Promise<Response> => {
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
      log.error("Código: 500 -" + " Mensaje: " + error + " - IP: " + req.socket.remoteAddress)
      return res.status(500).send(error);
    }
}

/**
 * Indica si un usuario sigue a otro
 * @param req Request (con el Id del usuario y el Id de seguidor)
 * @param res Response
 * @returns True si hay seguimiento o False en caso contrario
 */
export const isSeguidor = async (req: Request, res: Response): Promise<Response> => {
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
    log.error("Código: 500 -" + " Mensaje: " + error + " - IP: " + req.socket.remoteAddress)
    return res.status(500).send(error);
  }
}

/**
 * Inserta un seguimiento en la base de datos
 * @param req Request (con el Id del usuario y el Id de seguidor)
 * @param res Response
 * @returns True si se ha podido insertar
 */
export const seguir = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_usuario = req.body.idUser;
    const id_seguidor = req.body.idSeg;
    const fecha = new Date((new Date().setHours(new Date().getHours() - (new Date().getTimezoneOffset() / 60))))
    const seguidorAInsertar = new seguidorModel({id_usuario, id_seguidor, fecha})
    await seguidorAInsertar.save();
    log.info("Código: 200 -" + " Mensaje: Seguidor insertado" + " - IP: " + req.socket.remoteAddress + " - IDUsu: " + id_usuario + " - IDSeg: " + id_seguidor)
    return res.status(200).json({seguidor: true});
  } catch (error) {
    log.error("Código: 500 -" + " Mensaje: " + error + " - IP: " + req.socket.remoteAddress)
    return res.status(500).send(error);
  }
}

/**
 * Elimina un seguimiento en la base de datos
 * @param req Request (con el Id del usuario y el Id de seguidor)
 * @param res Response
 * @returns True si se ha podido eliminar
 */
export const dejarDeSeguir = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_usuario = req.body.idUser;
    const id_seguidor = req.body.idSeg;
    const seBorra = await seguidorModel.deleteOne({id_usuario: id_usuario, id_seguidor: id_seguidor});
    if(seBorra.deletedCount === 1){
      log.info("Código: 200 -" + " Mensaje: Seguidor eliminado" + " - IP: " + req.socket.remoteAddress + " - IDUsu: " + id_usuario + " - IDSeg: " + id_seguidor)
      return res.status(200).json({ borrado: true });
    }
    else{
      return res.status(200).json({ borrado: false });
    } 
  } catch (error) {
    log.error("Código: 500 -" + " Mensaje: " + error + " - IP: " + req.socket.remoteAddress)
    return res.status(500).send(error);
  }
}

/**
 * Devuelve los Ids de los usuarios seguidos de un usuario
 * @param req Request (con el Id del usuario)
 * @param res Response
 * @returns Lista de Ids de los usuario seguidos
 */
export const getFollowingUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_usuario = req.params.idUser;
    const users = await seguidorModel.find({id_seguidor: id_usuario});
    var listaIds: String[] = []
    users.map((user: any) => {
      listaIds.push(user.id_usuario)
    })
    return res.status(200).json({ followUsers: listaIds });
  } catch (error) {
    log.error("Código: 500 -" + " Mensaje: " + error + " - IP: " + req.socket.remoteAddress)
    return res.status(500).send(error);
  }
}

/**
 * Devuelve los Ids de los seguidores de un usuario
 * @param req Request (con el Id del usuario)
 * @param res Response
 * @returns Lista de Ids de los seguidores
 */
export const getFollowsByUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_usuario = req.params.idUser;
    const users = await seguidorModel.find({id_usuario: id_usuario});
    var listaIds: String[] = []
    users.map((user: any) => {
      listaIds.push(user.id_seguidor)
    })
    return res.status(200).json({ followUsers: listaIds });
  } catch (error) {
    log.error("Código: 500 -" + " Mensaje: " + error + " - IP: " + req.socket.remoteAddress)
    return res.status(500).send(error);
  }
}

/**
 * Elimina todos los seguimientos de un usuario
 * @param req Request (con el Id del usuario)
 * @param res Response
 * @returns True si se ha podido eliminar
 */
export const eliminarSeguimientos = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_usuario = req.body.idUser;
    await seguidorModel.deleteMany({id_usuario: id_usuario});
    await seguidorModel.deleteMany({id_seguidor: id_usuario});
    log.info("Código: 200 -" + " Mensaje: Seguidores y seguimientos eliminados" + " - IP: " + req.socket.remoteAddress + " - IDUsu: " + id_usuario)
    return res.status(200).json({ borrado: true });
  } catch (error) {
    log.error("Código: 500 -" + " Mensaje: " + error + " - IP: " + req.socket.remoteAddress)
    return res.status(500).send(error);
  }
}
