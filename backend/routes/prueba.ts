import express, {Router} from 'express';
const api:Router = express.Router()

api.get(
    "/miembros"
  );

module.exports = api;
