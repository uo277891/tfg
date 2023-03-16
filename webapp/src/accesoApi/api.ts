import { Publicacion, Seguidor } from "../interfaces/interfaces";

const llamadaBasica = 'http://localhost:5000';

export async function getPublicaciones(id_usuario: any): Promise<Publicacion[]> {
    let res = await fetch(llamadaBasica + '/publicaciones/' + id_usuario);
    let publicaciones = await res.json()
    return publicaciones.publicaciones
}

export async function getSeguidores(id_usuario: any): Promise<Seguidor[]> {
    let res = await fetch(llamadaBasica + '/seguidores/' + id_usuario);
    let seguidores = await res.json()
    return seguidores.seguidores
}