import { Publicacion, Seguidor, Usuario, Signature, Comentario } from "../interfaces/interfaces";

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

export async function getUsuarioByCountry(country: any): Promise<Usuario[]> {
    let res = await fetch(llamadaBasica + '/usuario/getusuario/country/' + country);
    let usuario = await res.json()
    return usuario.users
}

export async function getUsuarioByTipoUsuario(tipo: any): Promise<Usuario[]> {
    let res = await fetch(llamadaBasica + '/usuario/getusuario/tipo/' + tipo);
    let usuario = await res.json()
    return usuario.users
}

export async function getUsuarioByFecha(fechaInicio: any, fechaFin: any): Promise<Usuario[]> {
    let res = await fetch(llamadaBasica + '/usuario/getusuario/fecha/' + fechaInicio + "/" + fechaFin);
    let usuario = await res.json()
    return usuario.users
}

export async function getUsuarioByIdInDate(idUser: any, fechaInicio: any, fechaFin: any): Promise<Usuario[]> {
    let res = await fetch(llamadaBasica + '/usuario/getusuario/id/fecha/' + idUser + "/" + fechaInicio + "/" + fechaFin);
    let usuario = await res.json()
    return usuario.users
}

export async function getSignature(idUser: any): Promise<Signature> {
    let res = await fetch(llamadaBasica + '/cloudinary/signature/' + idUser);
    let respuesta = await res.json()
    return respuesta
}

export async function borrarPublicacion(idPub: any): Promise<Signature> {
    let res = await fetch(llamadaBasica + '/cloudinary/publicacion/delete/' + idPub);
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

export async function getFollowsByUser(idUser: any): Promise<String[]> {
    let res = await fetch(llamadaBasica + '/seguidores/getseguidos/' + idUser);
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
    let comentario = await res.json()
    return comentario.insertado;
}

export async function getComentarios(id_publication: any): Promise<Comentario[]> {
    let res = await fetch(llamadaBasica + '/comentarios/getcomentarios/' + id_publication);
    let comentarios = await res.json()
    return comentarios.comentarios
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

export async function actualizaUsuario(nombre_anterior: string, nombre: string, pais: string, localidad: string, fecha_nac: any, nombre_spotify: string,
    descripcion: string, enlace_foto: string): Promise<Boolean> {
        var requestOptions;
        if(enlace_foto !== "") {
            requestOptions = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ nombre: nombre, pais: pais, localidad: localidad, fecha_nac: fecha_nac, nombre_spotify: nombre_spotify, 
                descripcion: descripcion, enlace_foto: enlace_foto })
            };
          }
          else {
            requestOptions = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ nombre: nombre, pais: pais, localidad: localidad, fecha_nac: fecha_nac, nombre_spotify: nombre_spotify, descripcion: descripcion })
            };
          }
    let res = await fetch(llamadaBasica + "/usuario/profile/edit/" + nombre_anterior, requestOptions);
    let user = await res.json()
    return user.actualizado
}

export async function pruebaArchivo(idUser: string, archivo: File): Promise<string>{
    let data = new FormData();
    var url_foto = ""
    await getSignature(idUser)
    const cloudinaryURI = process.env.REACT_APP_CLOUDINARY_URL
    const api_key = process.env.REACT_APP_CLOUDINARY_API_KEY
    const upload_preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_PERFILES
    console.log(api_key)
    console.log(upload_preset)
    if(api_key !== undefined && upload_preset !== undefined){
        data.append("file", archivo);
        data.append("api_key", api_key);
        data.append('upload_preset', upload_preset);
        data.append("public_id", idUser);
        const params = {
            method: 'POST',
            body: data
        };
        await fetch(cloudinaryURI + "upload", params)
            .then(async (response) => 
            {
            if(response.ok){
                console.log("Correcto")
                const url = await response.json()
                url_foto = url.secure_url
                return url_foto;
            }
            else{
                url_foto = process.env.REACT_APP_CLOUDINARY_DEFAULT_FOTO + ""
            }
            })
    }
    return url_foto
}