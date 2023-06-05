import { Comentario } from "../interfaces/interfaces";

const llamadaBasica = 'http://localhost:5000';

/**
 * Añade un comentario a la base de datos
 * @param idPub Id de la publicación donde se comenta
 * @param idUsu Id del usuario que comenta
 * @param texto Texto del comentario
 * @returns Si el comentario ha podido ser insertado
 */
export async function añadirComentario(idPub: string, idUsu: string, texto: string): Promise<boolean> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_publicacion: idPub, id_usu_coment: idUsu, texto: texto })
    };
    let res = await fetch(llamadaBasica + '/comentarios/new/', requestOptions);
    let comentario = await res.json()
    return comentario.insertado;
}

/**
 * Devuelve los comentarios de una publicación
 * @param id_publication Id de la publicación donde se comenta
 * @returns Lista de comentarios
 */
export async function getComentarios(id_publication: any): Promise<Comentario[]> {
    let res = await fetch(llamadaBasica + '/comentarios/getcomentarios/' + id_publication);
    let comentarios = await res.json()
    return comentarios.comentarios
}

/**
 * Añade una respuesta a la base de datos
 * @param idCom Id del comentario que se responde
 * @param idPub Id de la publicación donde se comenta
 * @param idUsu Id del usuario al que se le responde
 * @param idUsuResp Id del usuario que responde
 * @param texto Texto de la respuesta
 * @returns Si el comentario ha podido ser insertado
 */
export async function añadirRespuestaComentario(idCom: string, idPub: string, idUsu: string, idUsuResp: string, texto: string): Promise<boolean> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_comment: idCom, id_publicacion: idPub, id_usu_coment: idUsu, id_usu_respond: idUsuResp, texto: texto })
    };
    let res = await fetch(llamadaBasica + '/comentarios/respond/new/', requestOptions);
    let comentario = await res.json()
    return comentario.insertado;
}

/**
 * Devuelve las respuestas de un comentario
 * @param id_comment Id del comentario
 * @returns Lista de respuestas
 */
export async function getRespuestaComentario(id_comment: any): Promise<Comentario[]> {
    let res = await fetch(llamadaBasica + '/comentarios/getcomentariosrespuesta/' + id_comment);
    let comentarios = await res.json()
    return comentarios.comentarios
}

/**
 * Elimina todos los comentarios y respuestas de un usuario
 * @param idUser Id del usuario
 * @returns Si se ha podido eliminar los comentarios y las respuestas
 */
export async function eliminarComentariosUsuario(idUser: any): Promise<boolean> {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser: idUser })
    };
    let res = await fetch(llamadaBasica + '/comentarios/eliminar/', requestOptions);
    let borrado = await res.json()
    return borrado
}

/**
 * Elimina un comentario y sus respuestas
 * @param idCom Id del comentario
 * @returns Si se ha podido eliminar el comentario y las respuestas
 */
export async function eliminarComentarioYRespuestas(idCom: any): Promise<boolean> {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idCom: idCom })
    };
    let res = await fetch(llamadaBasica + '/comentario/eliminar/', requestOptions);
    let borrado = await res.json()
    return borrado
}