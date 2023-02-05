import { Request, Response } from 'express';
const PruebaSquema = require('../models/pruebaModel');

const getPrueba = async (req: Request, res: Response): Promise<Response> => {
  try {
    var respuesta = await PruebaSquema.find();
    console.log(respuesta)
    return res.status(200).json(respuesta);
  } catch (error) {
    console.log("ERROR CARGA PRUEBA")
    return res.status(500).send(error);
  }
}

module.exports = {getPrueba}