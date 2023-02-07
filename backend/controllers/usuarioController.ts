import { Request, Response } from 'express';
const usuarioSquema = require('../models/usuarioModel');

const getUsuarioByName = async (req: Request, res: Response): Promise<Response> => {
  try {
    var respuesta = await usuarioSquema.find({nombre: req.params.nombre});
    console.log(respuesta)
    return res.status(200).json(respuesta);
  } catch (error) {
    console.log("ERROR CARGA PRUEBA")
    return res.status(500).send(error);
  }
}

module.exports = {getUsuarioByName}