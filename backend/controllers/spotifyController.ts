import { Request, Response } from 'express';

require("dotenv").config();

var SpotifyAPI = require('spotify-web-api-node');

var spotify = new SpotifyAPI({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

/**
 * Añade un Token para poder realizar llamadas a la API de Spotify
 */
export const getToken = async () => {
    spotify.clientCredentialsGrant().then(
        function(data: any) {
            spotify.setAccessToken(data.body['access_token']);
            },
        function(error: any) {
            console.log(error)
            }
    )
}

/**
 * Devuelve los datos del artista asociados al Id
 * @param req Request (con el Id del artista de Spotify)
 * @param res Response
 * @returns Datos del artista
 */
export const getArtista = async (req: Request, res: Response): Promise<Response> => {
    try {
        await getToken()
        const idArtist = req.params.idArtist
        const artista = await spotify.getArtist(idArtist)
        return res.status(200).json({artista: artista.body});
    } catch (error) {
        return res.status(500).send(error);
    }
}

/**
 * Devuelve los datos de los 6 mejores álbumes asociados al Id
 * @param req Request (con el Id del artista de Spotify)
 * @param res Response
 * @returns Datos de los álbumes
 */
export const getAlbumesArtista = async (req: Request, res: Response): Promise<Response> => {
    try {
        await getToken()
        const idArtist = req.params.idArtist
        const albumes = await spotify.getArtistAlbums(idArtist, { limit: 6, offset: 0 })
        return res.status(200).json({albumes: albumes.body.items});
    } catch (error) {
        return res.status(500).send(error);
    }
}

/**
 * Devuelve los datos de las 6 mejores canciones asociados al Id
 * @param req Request (con el Id del artista de Spotify)
 * @param res Response
 * @returns Datos de las canciones
 */
export const getMejoresCancionesArtista = async (req: Request, res: Response): Promise<Response> => {
    try {
        await getToken()
        const idArtist = req.params.idArtist
        const pais = req.params.pais
        const canciones = await spotify.getArtistTopTracks(idArtist, pais)
        return res.status(200).json({canciones: canciones.body.tracks});
    } catch (error) {
        return res.status(500).send(error);
    }
}

/**
 * Devuelve los datos de los 12 artistas más similares asociados al Id
 * @param req Request (con el Id del artista de Spotify)
 * @param res Response
 * @returns Datos de los artistas similares
 */
export const getArtistasSimilares = async (req: Request, res: Response): Promise<Response> => {
    try {
        await getToken()
        const idArtist = req.params.idArtist
        const artSimilares = await spotify.getArtistRelatedArtists(idArtist)
        return res.status(200).json({artSimilares: artSimilares.body.artists});
    } catch (error) {
        return res.status(500).send(error);
    }
}

getToken();
