import { Request, Response } from 'express';

const usuarioSquema = require('../models/usuarioModel');
const {encriptar, comparaContraseñas} = require("../helpers/encryptContraseña");
const jwt = require("jsonwebtoken")

const inicioSesion = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {nombre, contraseña} = req.body;
    const usuarioAsociado = await usuarioSquema.findOne({nombre: nombre});
    if(usuarioAsociado === null){
      return res.status(400).json("No hay usuario con ese nombre");
    }
    else{
      const contraseñasIguales = await comparaContraseñas(contraseña, usuarioAsociado.contrasena)
      if(contraseñasIguales) {
        var token = await jwt.sign({ usuario: usuarioAsociado }, "secreto", {
          expiresIn: 86400,
        });
        return res.status(200).json(token);
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
    const {nombre, contraseña, pais, localidad, fecha_nac, nombre_spotify, enlace_foto} = req.body;

    const usuarioAsociado = await usuarioSquema.findOne({nombre: nombre});
    if(usuarioAsociado !== null){
      return res.status(400).json("Ya hay usuario con ese nombre");
    }
    else{
      const contrasena = await encriptar(contraseña)
      const usuarioAInsertar = new usuarioSquema({nombre, contrasena, pais, localidad, fecha_nac, nombre_spotify, enlace_foto})
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
      const id_user = req.params.id_user;
      const usuarioAsociado = await usuarioSquema.find({_id: id_user});
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

const getUsuarioByName = async (req: Request, res: Response): Promise<Response> => {
  try {
    const nombre = req.params.name;
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

const getUsuariosByName = async (req: Request, res: Response): Promise<Response> => {
  try {
    const nombre = req.params.name;
    const usuarioAsociado = await usuarioSquema.find({nombre: { $regex: '.*' + nombre + '.*' }});
    if(usuarioAsociado === null){
      return res.status(400).json("No hay usuarios con ese nombre");
    }
    else{
      return res.status(200).json({ users: usuarioAsociado });
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

module.exports = {inicioSesion, insertarUsuario, getUsuario, getUsuarioByName, updateUsuario, getUsuariosByName}