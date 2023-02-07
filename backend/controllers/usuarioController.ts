import { Request, Response } from 'express';
const usuarioSquema = require('../models/usuarioModel');

const inicioSesion = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {nombre, contraseña} = req.body;
    const usuarioAsociado = await usuarioSquema.find({nombre: nombre});
    if(!usuarioAsociado){
      return res.status(500).send("No hay usuario con ese nombre");
    }
    else{
      if(usuarioAsociado.contraseña === contraseña){
        return res.status(200).send("Todo correcto");
      }
      else{
        return res.status(400).send("Credenciales incorrectas");
      }
    }
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

module.exports = {inicioSesion, insertarUsuario}