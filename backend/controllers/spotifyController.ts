import { Request, Response } from 'express';

require("dotenv").config();

var SpotifyAPI = require('spotify-web-api-node');

var spotify = new SpotifyAPI({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

const getToken = async () => {
    spotify.clientCredentialsGrant().then(
        function(data: any) {
            spotify.setAccessToken(data.body['access_token']);
            },
        function(error: any) {
            console.log(error)
            }
    )
}

const getArtista = async (req: Request, res: Response): Promise<Response> => {
    try {
        const idArtist = req.params.idArtist
        const artista = await spotify.getArtist(idArtist)
        return res.status(200).json({artista: artista});
    } catch (error) {
        getToken()
        return getArtista(req, res);
    }
}

const getAlbumesArtista = async (req: Request, res: Response): Promise<Response> => {
    try {
        getToken()
        const idArtist = req.params.idArtist
        const albumes = await spotify.getArtistAlbums(idArtist, { limit: 5, offset: 0 })
        return res.status(200).json({albumes: albumes});
    } catch (error) {
        return res.status(500).send(error);
    }
}

const getMejoresCancionesArtista = async (req: Request, res: Response): Promise<Response> => {
    try {
        getToken()
        const idArtist = req.params.idArtist
        const pais = req.params.pais
        const canciones = await spotify.getArtistTopTracks(idArtist, pais)
        return res.status(200).json({canciones: canciones});
    } catch (error) {
        return res.status(500).send(error);
    }
}

const getArtistasSimilares = async (req: Request, res: Response): Promise<Response> => {
    try {
        getToken()
        const idArtist = req.params.idArtist
        const canciones = await spotify.getArtistRelatedArtists(idArtist)
        return res.status(200).json({canciones: canciones});
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports = {getArtista, getAlbumesArtista, getMejoresCancionesArtista, getArtistasSimilares}