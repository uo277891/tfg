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

export async function getUsuarios(id_usuario: any): Promise<Usuario[]> {
    if(id_usuario.length === 0)
        return []
    let res = await fetch(llamadaBasica + '/usuario/getusuarios/' + id_usuario);
    let usuario = await res.json()
    return usuario.users
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

export async function getFollowingUsers(idUser: any): Promise<String[]> {
    let res = await fetch(llamadaBasica + '/seguidores/getSeguidores/' + idUser);
    const respuesta = await res.json()
    const idFollowUsers = respuesta.followUsers;
    return idFollowUsers;
}

export async function getPublicacion(id_publication: any): Promise<Publicacion> {
    let res = await fetch(llamadaBasica + '/publicaciones/getpublicacion/' + id_publication);
    let publicaciones = await res.json()
    return publicaciones.publicacion
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

export async function registro(nombre: string, contraseña: string, pais: string, localidad: string, fecha_nac: any, nombre_spotify: string, enlace_foto: string, descripcion: string, tipo: string): Promise<any> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre, contraseña: contraseña, pais: pais, localidad: localidad, fecha_nac: fecha_nac, nombre_spotify: nombre_spotify, enlace_foto: enlace_foto, descripcion: descripcion, tipo: tipo })
    };
    let res = await fetch(llamadaBasica + '/usuario/register/', requestOptions);
    let usuario = await res.json()
    return usuario
}

export async function actualizaFoto(nombre: any, enlace_foto: any): Promise<Boolean> {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enlace_foto: enlace_foto})
    };
    let res = await fetch(llamadaBasica + '/usuario/edit/' + nombre, requestOptions);
    let usuario = await res.json()
    return usuario.actualizado
}

export async function añadirComentario(idPub: string, idUsu: string, texto: string): Promise<boolean> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_publicacion: idPub, id_usu_coment: idUsu, texto: texto })
    };
    let res = await fetch(llamadaBasica + '/comentarios/new/', requestOptions);
    let seguidor = await res.json()
    return seguidor;
}