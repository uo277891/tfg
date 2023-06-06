import {Router} from 'express';

const expressPr = require('express')
const api:Router = expressPr.Router()

/**
 * En esta clase se vinculan los métodos los controladores con la ruta específica para poder ser llamada desde el frontend
 */
const {getArtista, getAlbumesArtista, getMejoresCancionesArtista, getArtistasSimilares} = require("../controllers/spotifyController")

api.get(
  "/spotify/artista/:idArtist",
  getArtista
);

api.get(
    "/spotify/artista/albumes/:idArtist",
    getAlbumesArtista
);

api.get(
    "/spotify/artista/canciones/:idArtist/:pais",
    getMejoresCancionesArtista
);

api.get(
    "/spotify/artista/similares/:idArtist",
    getArtistasSimilares
);

module.exports = api;
