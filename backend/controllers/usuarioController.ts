import { Request, Response } from 'express';

const usuarioSquema = require('../models/usuarioModel');
const {encriptar, comparaContraseñas} = require("../helpers/encryptContraseña");

const inicioSesion = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {nombre, contraseña} = req.body;
    const usuarioAsociado = await usuarioSquema.findOne({nombre: nombre});
    if(usuarioAsociado === null){
      return res.status(400).json("No hay usuario con ese nombre");
    }
    else{
      const contraseñasIguales = await comparaContraseñas(contraseña, usuarioAsociado.contrasena)
      console.log(contraseñasIguales)
      if(contraseñasIguales) {
        return res.status(200).json("Todo correcto");
      }
      else{
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

    const usuarioAsociado = await usuarioSquema.findOne({nombre: nombre});
    if(usuarioAsociado !== null){
      return res.status(400).json("Ya hay usuario con ese nombre");
    }
    else{
      const contrasena = await encriptar(contraseña)
      const usuarioAInsertar = new usuarioSquema({nombre, contrasena, pais, localidad, fecha_nac, nombre_spotify})
      usuarioAInsertar.save();
      return res.status(200).send("Usuario creado");
    }
  } catch (error) {
    console.log("ERROR INSERTAR USUARIO")
    return res.status(500).send(error);
  }
}

const getUsuario = async (req: Request, res: Response): Promise<Response> => {
    try {
      const nombre = req.params.nombre;
      const usuarioAsociado = await usuarioSquema.findOne({nombre: nombre});
      if(usuarioAsociado === null){
        return res.status(400).json("No hay usuario con ese nombre");
      }
      else{
        return res.status(200).json({ user: usuarioAsociado });
      } 
    } catch (error) {
      return res.status(500).send(error);
    }
}

const updateUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const nombreAnterior = req.params.nombreAnterior;
    const datosNuevos = req.body;
    const usuarioAsociado = await usuarioSquema.findOne({nombre: nombreAnterior});
    const usuarioYaEscogido = await usuarioSquema.findOne({nombre: datosNuevos.nombre});
    console.log(datosNuevos)
    if(usuarioYaEscogido !== null && nombreAnterior !== datosNuevos.nombre){
      return res.status(400).json("Nombre ya escogido");
    }
    else{
      await usuarioSquema.findByIdAndUpdate(usuarioAsociado._id, datosNuevos)
      return res.status(200).json("Actualización correcta del perfil");
    }

  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = {inicioSesion, insertarUsuario, getUsuario, updateUsuario}