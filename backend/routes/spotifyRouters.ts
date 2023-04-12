import express, {Router} from 'express';
const api:Router = express.Router()

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
