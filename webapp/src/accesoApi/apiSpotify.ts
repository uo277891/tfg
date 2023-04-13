const llamadaBasica = 'http://localhost:5000';

export async function getArtista(idArtist: any): Promise<any> {
    let res = await fetch(llamadaBasica + '/spotify/artista/' + idArtist);
    let respuesta = await res.json()
    return respuesta.artista
}

export async function getAlbumes(idArtist: any): Promise<any> {
    let res = await fetch(llamadaBasica + '/spotify/artista/albumes/' + idArtist);
    let respuesta = await res.json()
    return respuesta.albumes
}

export async function getCanciones(idArtist: any): Promise<any> {
    let res = await fetch(llamadaBasica + '/spotify/artista/canciones/' + idArtist + "/ES");
    let respuesta = await res.json()
    return respuesta.canciones
}

export async function getArtistasSimilares(idArtist: any): Promise<any> {
    let res = await fetch(llamadaBasica + '/spotify/artista/similares/' + idArtist);
    let respuesta = await res.json()
    return respuesta.artSimilares
}