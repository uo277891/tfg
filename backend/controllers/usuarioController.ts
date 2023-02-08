import { Request, Response } from 'express';

const usuarioSquema = require('../models/usuarioModel');
const {encriptar, comparaContraseñas} = require("../helpers/encryptContraseña");

const inicioSesion = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {nombre, contraseña} = req.body;
    const usuarioAsociado = await usuarioSquema.findOne({nombre: nombre});
    if(usuarioAsociado === null){
      console.log("sinUsuario")
      return res.status(400).json("No hay usuario con ese nombre");
    }
    else{
      const contraseñasIguales = await comparaContraseñas(contraseña, usuarioAsociado.contrasena)
      console.log(contraseñasIguales)
      if(contraseñasIguales) {
        console.log("usuarioAsociado")
        return res.status(200).json("Todo correcto");
      }
      else{
        console.log("malContraseña")
        return res.status(400).json("Credenciales incorrectas");
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

const insertarUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {nombre, contraseña, pais, localidad, fecha_nac, nombre_spotify} = req.body;

    const contraseñaEncriptada = encriptar(contraseña)

    const usuarioAInsertar = new usuarioSquema({nombre, contraseñaEncriptada, pais, localidad, fecha_nac, nombre_spotify})
    usuarioAInsertar.save();
    console.log("Usuario creado");
    return res.status(200).send("Usuario creado");
  } catch (error) {
    console.log("ERROR INSERTAR USUARIO")
    return res.status(500).send(error);
  }
}

module.exports = {inicioSesion, insertarUsuario}