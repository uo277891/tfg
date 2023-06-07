const llamadaBasica = process.env.REACT_APP_DIRECCION || 'http://localhost:5000';

/**
 * Devuelve datos del artista
 * @param idArtist Id del artista en Spotify
 * @returns Datos del artista
 */
export async function getArtista(idArtist: any): Promise<any> {
    let res = await fetch(llamadaBasica + '/spotify/artista/' + idArtist);
    let respuesta = await res.json()
    return respuesta.artista
}

/**
 * Devuelve datos de los mejores álbumes de un artista
 * @param idArtist Id del artista en Spotify
 * @returns Datos de los 6 mejores álbumes
 */
export async function getAlbumes(idArtist: any): Promise<any> {
    let res = await fetch(llamadaBasica + '/spotify/artista/albumes/' + idArtist);
    let respuesta = await res.json()
    return respuesta.albumes
}

/**
 * Devuelve datos de las mejores canciones de un artista
 * @param idArtist Id del artista en Spotify
 * @returns Datos de las 6 mejores canciones
 */
export async function getCanciones(idArtist: any): Promise<any> {
    let res = await fetch(llamadaBasica + '/spotify/artista/canciones/' + idArtist + "/ES");
    let respuesta = await res.json()
    return respuesta.canciones
}

/**
 * Devuelve datos de los artistas más similares del artista
 * @param idArtist Id del artista en Spotify
 * @returns Datos de 12 artistas similares del artista
 */
export async function getArtistasSimilares(idArtist: any): Promise<any> {
    let res = await fetch(llamadaBasica + '/spotify/artista/similares/' + idArtist);
    let respuesta = await res.json()
    return respuesta.artSimilares
}