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
      if(contraseñasIguales) {
        return res.status(200).json({usuario: usuarioAsociado});
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
    const {nombre, contraseña, pais, localidad, fecha_nac, nombre_spotify, enlace_foto, descripcion, tipo, genero, redes} = req.body;

    const usuarioAsociado = await usuarioSquema.findOne({nombre: nombre});
    if(usuarioAsociado !== null){
      return res.status(400).json({creado: false});
    }
    else{
      const contrasena = await encriptar(contraseña)
      const usuarioAInsertar = new usuarioSquema({nombre, contrasena, pais, localidad, fecha_nac, nombre_spotify, enlace_foto, descripcion, tipo, genero, redes})
      await usuarioAInsertar.save();
      const user = await usuarioSquema.findOne({nombre: nombre});
      return res.status(200).json({creado: true, usuario: user});
    }
  } catch (error) {
    console.log("FALLO INSERTAR USUARIO")
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

const getUsuarios = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_user = req.params.id_user.split(',');
    const usuarios = await usuarioSquema.find({_id: {$in: id_user}});
    if(usuarios === null){
      return res.status(400).json({users: []});
    }
    else{
      return res.status(200).json({ users: usuarios });
    } 
  } catch (error) {
    return res.status(500).send(error);
  }
}

const getUsuariosByIdInDate = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_user = req.params.idUser.split(',');
    const fechaInicio = new Date(parseInt(req.params.fechaInicio), 0);
    const fechaFin = new Date(parseInt(req.params.fechaFin), 0);
    console.log(fechaInicio)
    console.log(fechaFin)
    console.log(id_user)
    const usuarios = await usuarioSquema.find({$and:[{_id: {$in: id_user}, fecha_nac: {"$gte" : fechaFin, "$lte" : fechaInicio}}]});
    if(usuarios === null){
      return res.status(400).json({users: []});
    }
    else{
      return res.status(200).json({ users: usuarios });
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
      return res.status(400).json({ users: [] });
    }
    else{
      return res.status(200).json({ users: usuarioAsociado });
    } 
  } catch (error) {
    return res.status(500).send(error);
  }
}

const getUsuariosByCountry = async (req: Request, res: Response): Promise<Response> => {
  try {
    const pais = req.params.country;
    const usuarioAsociado = await usuarioSquema.find({pais: pais });
    if(usuarioAsociado === null){
      return res.status(200).json({ users: [] });
    }
    else{
      return res.status(200).json({ users: usuarioAsociado });
    } 
  } catch (error) {
    return res.status(500).send(error);
  }
}

const getUsuariosByTipoUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const tipo = req.params.tipoUsu;
    const usuarioAsociado = await usuarioSquema.find({tipo: tipo });
    if(usuarioAsociado === null){
      return res.status(200).json({ users: [] });
    }
    else{
      return res.status(200).json({ users: usuarioAsociado });
    } 
  } catch (error) {
    return res.status(500).send(error);
  }
}

const getUsuariosByGenero = async (req: Request, res: Response): Promise<Response> => {
  try {
    const genero = req.params.genero;
    const usuarioAsociado = await usuarioSquema.find({genero: genero });
    if(usuarioAsociado === null){
      return res.status(200).json({ users: [] });
    }
    else{
      return res.status(200).json({ users: usuarioAsociado });
    } 
  } catch (error) {
    return res.status(500).send(error);
  }
}

const getUsuariosByFecha = async (req: Request, res: Response): Promise<Response> => {
  try {
    const fechaInicio = new Date(parseInt(req.params.fechaInicio), 0);
    const fechaFin = new Date(parseInt(req.params.fechaFin), 0);
    const usuarioAsociado = await usuarioSquema.find({fecha_nac: {"$gte" : fechaFin, "$lte" : fechaInicio}});
    if(usuarioAsociado === null){
      return res.status(200).json({ users: [] });
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
      return res.status(400).json({actualizado: false});
    }
    else{
      await usuarioSquema.findByIdAndUpdate(usuarioAsociado._id, datosNuevos)
      return res.status(200).json({actualizado: true});
    }

  } catch (error) {
    return res.status(500).send(error);
  }
}

const updateFoto = async (req: Request, res: Response): Promise<Response> => {
  try {
    const nombre = req.params.nombre;
    const datosNuevos = req.body;
    const usuarioAsociado = await usuarioSquema.findOne({nombre: nombre});
    if(usuarioAsociado === null){
      return res.status(200).json({actualizado: false});
    }
    else{
      await usuarioSquema.findByIdAndUpdate(usuarioAsociado._id, datosNuevos)
      return res.status(200).json({actualizado: true});
    }

  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = {inicioSesion, insertarUsuario, getUsuario, getUsuarioByName, updateUsuario, 
  getUsuariosByName, getUsuarios, updateFoto, getUsuariosByCountry, getUsuariosByTipoUsuario, getUsuariosByFecha, getUsuariosByIdInDate, getUsuariosByGenero}