import { Comentario } from "../interfaces/interfaces";

const llamadaBasica = 'http://localhost:5000';

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

export async function getComentarios(id_publication: any): Promise<Comentario[]> {
    let res = await fetch(llamadaBasica + '/comentarios/getcomentarios/' + id_publication);
    let comentarios = await res.json()
    return comentarios.comentarios
}