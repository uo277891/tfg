import { Request, Response } from 'express';
const usuarioSquema = require('../models/usuarioModel');

const getUsuarioByName = async (req: Request, res: Response): Promise<Response> => {
  try {
    var respuesta = await usuarioSquema.find({nombre: req.params.nombre});
    console.log(respuesta)
    return res.status(200).json(respuesta);
  } catch (error) {
    return res.status(500).send(error);
  }
}

const insertarUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {nombre, contraseña} = req.body;

    const usuarioAInsertar = new usuarioSquema({nombre, contraseña})
    usuarioAInsertar.save();
    console.log("Usuario creado");
    return res.status(200).send("Usuario creado");
  } catch (error) {
    console.log("ERROR INSERTAR USUARIO")
    return res.status(500).send(error);
  }
}

module.exports = {getUsuarioByName, insertarUsuario}