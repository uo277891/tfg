import { Publicacion } from "../interfaces/interfaces";

const llamadaBasica = 'http://localhost:5000';

export async function getPublicaciones(id_usuario: any, order: string): Promise<Publicacion[]> {
    let res = await fetch(llamadaBasica + '/publicaciones/getpublicacion/' + id_usuario + "/" + order);
    let publicaciones = await res.json()
    return publicaciones.publicaciones
}

export async function getPublicacionesByTipo(id_usuario: any, tipo: string, fecha: string): Promise<Publicacion[]> {
    let res = await fetch(llamadaBasica + '/publicaciones/getpublicacion/tipo/' + id_usuario + "/" + tipo + "/" + fecha);
    let publicaciones = await res.json()
    return publicaciones.publicaciones
}

export async function getPublicacion(id_publication: any): Promise<Publicacion> {
    let res = await fetch(llamadaBasica + '/publicaciones/getpublicacion/' + id_publication);
    let publicaciones = await res.json()
    return publicaciones.publicacion
}

export async function getPublicacionWithLimit(skip: any): Promise<Publicacion[]> {
    let res = await fetch(llamadaBasica + '/publicaciones/getpublicacionskip/' + skip);
    let publicaciones = await res.json()
    return publicaciones.publicaciones
}

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

