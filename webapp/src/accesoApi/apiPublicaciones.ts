import { Publicacion } from "../interfaces/interfaces";

const llamadaBasica = process.env.REACT_APP_DIRECCION || 'http://localhost:5000';

/**
 * Devuelve las publicaciones de un usuario
 * @param id_usuario Id del usuario
 * @param order Orden de aplicación (fecha o número de me gustas)
 * @returns Lista de publicaciones
 */
export async function getPublicaciones(id_usuario: any, order: string): Promise<Publicacion[]> {
    let res = await fetch(llamadaBasica + '/publicaciones/getpublicacion/' + id_usuario + "/" + order);
    let publicaciones = await res.json()
    return publicaciones.publicaciones
}

/**
 * Devuelve las publicaciones de un usuario
 * @param id_usuario Id del usuario
 * @param tipo Tipo de publicación (texto, foto o audio)
 * @param orden Orden de aplicación (fecha o número de me gustas)
 * @returns 
 */
export async function getPublicacionesByTipo(id_usuario: any, tipo: string, orden: string): Promise<Publicacion[]> {
    let res = await fetch(llamadaBasica + '/publicaciones/getpublicacion/tipo/' + id_usuario + "/" + tipo + "/" + orden);
    let publicaciones = await res.json()
    return publicaciones.publicaciones
}

/**
 * Devuelve la publicación asociada a un Id
 * @param id_publication Id de la publicación
 * @returns Publicación asociada
 */
export async function getPublicacion(id_publication: any): Promise<Publicacion> {
    let res = await fetch(llamadaBasica + '/publicaciones/getpublicacion/' + id_publication);
    let publicaciones = await res.json()
    return publicaciones.publicacion
}

/**
 * Devuelve un número limitado de publicaciones (10), y se salta las especificadas en el parámetro
 * @param skip Número de publicaciones a saltar
 * @returns Lista de publicaciones
 */
export async function getPublicacionWithLimit(skip: any): Promise<Publicacion[]> {
    let res = await fetch(llamadaBasica + '/publicaciones/getpublicacionskip/' + skip);
    let publicaciones = await res.json()
    return publicaciones.publicaciones
}

/**
 * Actualiza el número de me gustas de una publicación
 * @param id_pub Id de la publicación
 * @param likes Me gusta asociados
 * @returns Nueva publicación
 */
export async function actualizarLikes(id_pub: any, likes: any): Promise<Publicacion> {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id_publication: id_pub, likes: likes})
      };
    let res = await fetch(llamadaBasica + '/publicaciones/updatelikes', requestOptions);
    let publicaciones = await res.json()
    return publicaciones.publicacion
}

/**
 * Elimina una publicación de la base de datos
 * @param idPub Id de la publicación
 * @param idUser Id del usuario
 * @returns Si se ha podido eliminar la publicación
 */
export async function eliminarPublicacion(idPub: any, idUser: any): Promise<boolean> {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser: idUser, idPub: idPub })
    };
    let res = await fetch(llamadaBasica + '/publicacion/delete', requestOptions);
    let borrado = await res.json()
    return borrado
}

/**
 * Elimina todas las publicaciones de un usuario de la base de datos
 * @param idUser Id del usuario
 * @returns Si se ha podido eliminar la publicación
 */
export async function eliminarPublicacionesUsuario(idUser: any): Promise<boolean> {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser: idUser })
    };
    let res = await fetch(llamadaBasica + '/publicacion/delete/usuario/', requestOptions);
    let borrado = await res.json()
    return borrado
}

/**
 * Inserta una publicación en la base de datos
 * @param id_usuario Id del usuario
 * @param texto Texto de la publicación
 * @param enlace_multimedia Enlace a la multimedia de la publicación
 * @param tipo_multimedia Tipo de publicación (txt, img, audio)
 * @returns Si se ha podido insertar la publicación
 */
export async function añadirPublicacion(id_usuario: string, texto: string, enlace_multimedia: string, tipo_multimedia: string): Promise<Publicacion> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_usuario: id_usuario, texto: texto, enlace_multimedia: enlace_multimedia, tipo_multimedia: tipo_multimedia })
    };
    let res = await fetch(llamadaBasica + '/publicaciones/new/', requestOptions);
    let pub = await res.json()
    return pub.pub;
}

/**
 * Actualiza una publicación en la base de datos
 * @param id_publicacion Id de la publicación
 * @param enlace_multimedia Enlace a la multimedia de la publicación
 * @param tipo_multimedia Tipo de publicación (txt, img, audio)
 * @returns Si se ha podido actualizar la publicación
 */
export async function actualizaPublicacion(id_publicacion: string, enlace_multimedia: string, tipo_multimedia: string): Promise<Boolean> {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enlace_multimedia: enlace_multimedia, tipo_multimedia: tipo_multimedia})
    };
    let res = await fetch(llamadaBasica + '/publicacion/update/' + id_publicacion, requestOptions);
    let pub = await res.json()
    return pub.actualizado
}

