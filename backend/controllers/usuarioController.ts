import { Request, Response } from 'express';

const usuarioSquema = require('../models/usuarioModel');
const {encriptar, comparaContraseñas} = require("../helpers/encryptContraseña");
const axios = require("axios");

require("dotenv").config();

/**
 * Inicio de sesión propocionando usuario y contraseña (la constraseña debe ser encriptada)
 * @param req Request (con el usuario y la contraseña)
 * @param res Response
 * @returns Usuario asociado a ese nombre
 */
export const inicioSesion = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {nombre, contraseña} = req.body;
    const usuarioAsociado = await usuarioSquema.findOne({nombre: nombre});
    if(usuarioAsociado === null){
      return res.status(200).json({usuario: null});
    }
    else{
      const contraseñasIguales = await comparaContraseñas(contraseña, usuarioAsociado.contrasena)
      if(contraseñasIguales) {
        return res.status(200).json({usuario: usuarioAsociado});
      }
      else{
        return res.status(200).json({usuario: null});
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

/**
 * Inserta un nuevo usuario en la base de datos
 * @param req Request (con todos los datos necesarios para el registro)
 * @param res Response
 * @returns True si se ha podifo insertar (junto con el usuario) o false en caso contrario
 */
export const insertarUsuario = async (req: Request, res: Response): Promise<Response> => {
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
    return res.status(500).send(error);
  }
}

/**
 * Devuelve el usuario que coincide con el Id
 * @param req Request (con el Id del usuario)
 * @param res Response
 * @returns Usuario asociado al Id
 */
export const getUsuario = async (req: Request, res: Response): Promise<Response> => {
    try {
      const id_user = req.params.id_user;
      const usuarioAsociado = await usuarioSquema.find({_id: id_user});
      if(usuarioAsociado === null){
        return res.status(400).json("No hay usuario con ese id");
      }
      else{
        return res.status(200).json({ user: usuarioAsociado });
      } 
    } catch (error) {
      return res.status(500).send(error);
    }
}

/**
 * Devuelve los usuarios que coinciden con los Ids
 * @param req Request (con los Ids de los usuarios)
 * @param res Response
 * @returns Lista de Usuarios asociados
 */
export const getUsuarios = async (req: Request, res: Response): Promise<Response> => {
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

/**
 * Devuelve los usuarios que coinciden con los Ids y ha nacido entre dos años proporcionados
 * @param req Request (con los Ids de los usuarios y los años de comienzo y fin)
 * @param res Response
 * @returns Lista de Usuarios asociados
 */
export const getUsuariosByIdInDate = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id_user = req.params.idUser.split(',');
    const fechaInicio = new Date(parseInt(req.params.fechaInicio), 0);
    const fechaFin = new Date(parseInt(req.params.fechaFin), 0);
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

/**
 * Devuelve el usuario cuyo nombre es igual al de la cadena pasada por parámetro
 * @param req Request (con la cadena a comprobar)
 * @param res Response
 * @returns Usuario asociado
 */
export const getUsuarioByName = async (req: Request, res: Response): Promise<Response> => {
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

/**
 * Devuelve los usuarios que contienen en su nombre la cadena pasada por parámetro
 * @param req Request (con la subcadena a comprobar)
 * @param res Response
 * @returns Lista de Usuarios asociados
 */
export const getUsuariosByName = async (req: Request, res: Response): Promise<Response> => {
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

/**
 * Devuelve los usuarios que contienen en su nombre la cadena pasada por parámetro y su Id está en la lista de Ids
 * @param req Request (con la subcadena a comprobar y la lista de Ids)
 * @param res Response
 * @returns Lista de Usuarios asociados
 */
export const getUsuariosByNameAndId = async (req: Request, res: Response): Promise<Response> => {
  try {
    const nombre = req.params.name;
    const id_usuario = req.params.idUsu.split(',');
    const usuarioAsociado = await usuarioSquema.find({_id: {$in: id_usuario}, nombre: { $regex: '.*' + nombre + '.*' }});
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

/**
 * Devuelve los usuarios cuyo pais de nacimiento es igual al pasado por parámetro
 * @param req Request (con el país a comprobar)
 * @param res Response
 * @returns Lista de Usuarios asociados
 */
export const getUsuariosByCountry = async (req: Request, res: Response): Promise<Response> => {
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

/**
 * Devuelve los usuarios cuyo tipo de usuario es igual al pasado por parámetro
 * @param req Request (con el tipo de usuario a comprobar)
 * @param res Response
 * @returns Lista de Usuarios asociados
 */
export const getUsuariosByTipoUsuario = async (req: Request, res: Response): Promise<Response> => {
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

/**
 * Devuelve los usuarios cuyo género favorito es igual al pasado por parámetro
 * @param req Request (con el género favorito a comprobar)
 * @param res Response
 * @returns Lista de Usuarios asociados
 */
export const getUsuariosByGenero = async (req: Request, res: Response): Promise<Response> => {
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

/**
 * Devuelve los usuarios cuya fecha de nacimiento está comprendida entre los años pasados por parámetro
 * @param req Request (con el año de inicio y el año de fin (ejemplo, [1987 - 2005]))
 * @param res Response
 * @returns Lista de Usuarios asociados
 */
export const getUsuariosByFecha = async (req: Request, res: Response): Promise<Response> => {
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

/**
 * Actualiza los datos de un usuario en la base de datos
 * @param req Request (con el nombre anterior del usuario y los datos que se deben actualizar)
 * @param res Response
 * @returns True si se ha podido actualizar o False en caso contrario
 */
export const updateUsuario = async (req: Request, res: Response): Promise<Response> => {
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

/**
 * Actualiza la foto de perfil de un usuario
 * @param req Request (con el nombre del usuario y los datos que se deben actualizar)
 * @param res Response
 * @returns True si se ha podido actualizar o False en caso contrario
 */
export const updateFoto = async (req: Request, res: Response): Promise<Response> => {
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

/**
 * Elimina un usuario de la base de datos
 * @param req Request (con el Id del usuario que se debe eliminar)
 * @param res Response
 * @returns True si se ha podido eliminar
 */
export const eliminarUsuario = async (req: Request, res: Response) => {
  try{
    await usuarioSquema.findByIdAndDelete(req.body.idUser)
    return res.status(200).json({borrado: true});
  } catch (error) {
    return res.status(500).send(error);
  }
}

/**
 * Comprueba si un token es válido para detectar robots en el sistema
 * @param req Request (con el token a validar)
 * @param res Response
 * @returns True si no es un humano o False en caso contrario
 */
export const reCaptchaGoogle = async (req: Request, res: Response) => {
  const token = req.body.token
  const respuesta = await axios.post("https://www.google.com/recaptcha/api/siteverify?secret=" + process.env.CAPTCHA_SECRET_KEY + "&response=" + token + "");
  console.log(respuesta.data.success)
  const robot = respuesta.data.success
  return res.status(200).json({robot: robot});
}

/**
 * Devuelve los usuario que coinciden con los filtros pasados por parámetro
 * @param req Request (con el país, año de inicio y fin para la fecha de nacimiento, tipo de usuario y género favorito)
 * @param res Response
 * @returns Lista de usuarios
 */
export const getUsuariosByFilters = async (req: Request, res: Response): Promise<Response> => {
  try {
    let tipoUsu = [req.params.tipoUsu];
    const country = req.params.country;
    const fechaInicio = new Date(parseInt(req.params.fechaInicio), 0);
    const fechaFin = new Date(parseInt(req.params.fechaFin), 0);
    let genre = [req.params.genero];
    if(tipoUsu[0] === "nada") tipoUsu = ["Artista", "Promotor", "Estándar"]
    if(genre[0] === "nada") genre = ["FreeStyle", "Rap", "Trap", "Pop", "Rock", "Otro"]
    if(country === "nada"){
      const usuarioAsociado = await usuarioSquema.find({
        tipo: {$in: tipoUsu}, fecha_nac: {"$gte" : fechaInicio, "$lte" : fechaFin}, genero: {$in: genre}});
      return res.status(200).json({ users: usuarioAsociado });
      }
    else{
      const usuarioAsociado = await usuarioSquema.find({ pais: country,
        tipo: {$in: tipoUsu}, fecha_nac: {"$gte" : fechaInicio, "$lte" : fechaFin}, genero: {$in: genre}});
      return res.status(200).json({ users: usuarioAsociado });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}