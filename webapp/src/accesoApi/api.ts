import { Publicacion, Seguidor, Usuario, Signature } from "../interfaces/interfaces";

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

export async function getUsuario(id_usuario: any): Promise<Usuario> {
    let res = await fetch(llamadaBasica + '/usuario/getusuario/' + id_usuario);
    let usuario = await res.json()
    return usuario.user
}

export async function getUsuarioByName(name: any): Promise<Usuario> {
    let res = await fetch(llamadaBasica + '/usuario/getusuario/name/' + name);
    let usuario = await res.json()
    return usuario.user
}

export async function getSignature(idUser: any): Promise<Signature> {
    let res = await fetch(llamadaBasica + '/cloudinary/signature/' + idUser);
    let respuesta = await res.json()
    return respuesta
}