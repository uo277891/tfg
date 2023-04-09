import { Seguidor } from "../interfaces/interfaces";

const llamadaBasica = 'http://localhost:5000';

export async function getSeguidores(id_usuario: any): Promise<Seguidor[]> {
    let res = await fetch(llamadaBasica + '/seguidores/' + id_usuario);
    let seguidores = await res.json()
    return seguidores.seguidores
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

export async function getFollowingUsers(idUser: any): Promise<String[]> {
    let res = await fetch(llamadaBasica + '/seguidores/getSeguidores/' + idUser);
    const respuesta = await res.json()
    const idFollowUsers = respuesta.followUsers;
    return idFollowUsers;
}

export async function getFollowsByUser(idUser: any): Promise<String[]> {
    let res = await fetch(llamadaBasica + '/seguidores/getseguidos/' + idUser);
    const respuesta = await res.json()
    const idFollowUsers = respuesta.followUsers;
    return idFollowUsers;
}