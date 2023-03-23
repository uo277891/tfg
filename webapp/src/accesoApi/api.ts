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

export async function getUsuario(id_usuario: any): Promise<Usuario[]> {
    let res = await fetch(llamadaBasica + '/usuario/getusuario/' + id_usuario);
    let usuario = await res.json()
    return usuario.user
}

export async function getUsuarioByName(name: any): Promise<Usuario[]> {
    let res = await fetch(llamadaBasica + '/usuario/getusuario/name/' + name);
    let usuario = await res.json()
    return usuario.user
}

export async function getSignature(idUser: any): Promise<Signature> {
    let res = await fetch(llamadaBasica + '/cloudinary/signature/' + idUser);
    let respuesta = await res.json()
    return respuesta
}

export async function getUsuariosByName(name: any): Promise<Usuario[]> {
    let res = await fetch(llamadaBasica + '/usuario/find/' + name);
    let usuario = await res.json()
    return usuario.users
}

export async function isSeguidor(idUser: any, idSeg: any): Promise<boolean> {
    let res = await fetch(llamadaBasica + '/seguidores/isSeguidor/' + idUser + "/" + idSeg);
    let isSeguidor = await res.json()
    return isSeguidor.isSeguidor
}

export async function dejarDeSeguir(idUser: any, idSeg: any): Promise<boolean> {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser: idUser, idSeg: idSeg })
    };
    let res = await fetch(llamadaBasica + '/seguidores/unfollow/', requestOptions);
    let borrado = await res.json()
    return borrado
}

export async function seguir(idUser: any, idSeg: any): Promise<boolean> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser: idUser, idSeg: idSeg })
    };
    let res = await fetch(llamadaBasica + '/seguidores/follow/', requestOptions);
    let seguidor = await res.json()
    return seguidor
}