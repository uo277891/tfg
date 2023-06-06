import express, {Router} from 'express';
const expressPr = require('express')
const api:Router = expressPr.Router()

/**
 * En esta clase se vinculan los métodos los controladores con la ruta específica para poder ser llamada desde el frontend
 */
import {getSeguidores, isSeguidor, dejarDeSeguir, seguir, getFollowingUsers, getFollowsByUser, eliminarSeguimientos} from "../controllers/seguidorController"

api.get(
  "/seguidores/:idUsu",
  getSeguidores
);

api.get(
  "/seguidores/isSeguidor/:idUsu/:idSeg",
  isSeguidor
);

api.post(
  "/seguidores/follow/",
  seguir
);

api.delete(
  "/seguidores/unfollow/",
  dejarDeSeguir
);

api.delete(
  "/seguidores/delete/all/",
  eliminarSeguimientos
);

api.get(
  "/seguidores/getSeguidores/:idUser",
  getFollowingUsers
);

api.get(
  "/seguidores/getseguidos/:idUser",
  getFollowsByUser
);

module.exports = api;
