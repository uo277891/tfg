import { Seguidor } from "../interfaces/interfaces";

const llamadaBasica = process.env.REACT_APP_DIRECCION || 'http://localhost:5000';

/**
 * Devuelve los seguidores de un usuario
 * @param id_usuario Id del usuario
 * @returns Lista de seguidores
 */
export async function getSeguidores(id_usuario: any): Promise<Seguidor[]> {
    let res = await fetch(llamadaBasica + '/seguidores/' + id_usuario);
    let seguidores = await res.json()
    return seguidores.seguidores
}

/**
 * Indica si un usuario sigue a otro
 * @param idUser Id del usuario 
 * @param idSeg Id del seguidor
 * @returns True si sigue y False en caso contrario
 */
export async function isSeguidor(idUser: any, idSeg: any): Promise<boolean> {
    let res = await fetch(llamadaBasica + '/seguidores/isSeguidor/' + idUser + "/" + idSeg);
    let isSeguidor = await res.json()
    return isSeguidor.isSeguidor
}

/**
 * Elimina un seguimiento de la base de datos
 * @param idUser Id del usuario 
 * @param idSeg Id del seguidor
 * @returns Si ha podido eliminar el seguimiento
 */
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

/**
 * Elimina todos los seguimientos de un usuario
 * @param idUser Id del usuario 
 * @returns Si ha podido eliminar todos los seguimientos
 */
export async function eliminarSeguimientos(idUser: any): Promise<boolean> {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser: idUser })
    };
    let res = await fetch(llamadaBasica + '/seguidores/delete/all/', requestOptions);
    let borrado = await res.json()
    return borrado
}

/**
 * Inserta un seguimiento de la base de datos
 * @param idUser Id del usuario 
 * @param idSeg Id del seguidor
 * @returns Si ha podido insetar el seguimiento
 */
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

/**
 * Devuelve los seguidores de un usuario
 * @param idUser Id del usuario 
 * @returns Lista de seguimientos
 */
export async function getFollowingUsers(idUser: any): Promise<String[]> {
    let res = await fetch(llamadaBasica + '/seguidores/getSeguidores/' + idUser);
    const respuesta = await res.json()
    const idFollowUsers = respuesta.followUsers;
    return idFollowUsers;
}

/**
 * Devuelve los usuario seguidos por un usuario
 * @param idUser Id del usuario 
 * @returns Lista de seguimientos
 */
export async function getFollowsByUser(idUser: any): Promise<String[]> {
    let res = await fetch(llamadaBasica + '/seguidores/getseguidos/' + idUser);
    const respuesta = await res.json()
    const idFollowUsers = respuesta.followUsers;
    return idFollowUsers;
}