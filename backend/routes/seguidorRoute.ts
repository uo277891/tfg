import express, {Router} from 'express';
const expressPr = require('express')
const api:Router = expressPr.Router()

const {getSeguidores, isSeguidor, dejarDeSeguir, seguir, getFollowingUsers, getFollowsByUser} = require("../controllers/seguidorController")

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

api.get(
  "/seguidores/getSeguidores/:idUser",
  getFollowingUsers
);

api.get(
  "/seguidores/getseguidos/:idUser",
  getFollowsByUser
);

module.exports = api;
