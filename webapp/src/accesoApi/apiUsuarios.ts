import { Usuario } from "../interfaces/interfaces";

const llamadaBasica = process.env.REACT_APP_DIRECCION || 'http://localhost:5000';
/**
 * Devuelve un usuario asociado al ID
 * @param id_usuario ID del usuario
 * @returns Usuario asociado
 */
export async function getUsuario(id_usuario: any): Promise<Usuario[]> {
    let res = await fetch(llamadaBasica + '/usuario/getusuario/' + id_usuario);
    let usuario = await res.json()
    return usuario.user
}

/**
 * Devuelve los usuarios asociados a los IDs
 * @param id_usuario IDs de los usuarios
 * @returns Lista de usuarios
 */
export async function getUsuarios(id_usuario: any): Promise<Usuario[]> {
    if(id_usuario.length === 0)
        return []
    let res = await fetch(llamadaBasica + '/usuario/getusuarios/' + id_usuario);
    let usuario = await res.json()
    return usuario.users
}

/**
 * Devuelve el usuario asociado a ID y nombre
 * @param id_usuario ID del usuario
 * @param nombre nombre del usuario
 * @returns Usuario asociado
 */
export async function getUsuariosByNameAndId(id_usuario: any, nombre: string): Promise<Usuario[]> {
    if(id_usuario.length === 0)
        return []
    let res = await fetch(llamadaBasica + '/usuario/getusuarios/filter/' + id_usuario + "/" + nombre);
    let usuario = await res.json()
    return usuario.users
}

/**
 * Devuelve el usuario asociado al nombre
 * @param name nombre del usuario
 * @returns Usuario asociado
 */
export async function getUsuarioByName(name: any): Promise<Usuario[]> {
    let res = await fetch(llamadaBasica + '/usuario/getusuario/name/' + name);
    let usuario = await res.json()
    return usuario.user
}

/**
 * Devuelve los usuarios asociados al país
 * @param country país del usuario
 * @returns Lista de usuarios
 */
export async function getUsuarioByCountry(country: any): Promise<Usuario[]> {
    let res = await fetch(llamadaBasica + '/usuario/getusuario/country/' + country);
    let usuario = await res.json()
    return usuario.users
}

/**
 * Devuelve los usuarios asociados al tipo de usuario
 * @param tipo tipo del usuario
 * @returns Lista de usuarios
 */
export async function getUsuarioByTipoUsuario(tipo: any): Promise<Usuario[]> {
    let res = await fetch(llamadaBasica + '/usuario/getusuario/tipo/' + tipo);
    let usuario = await res.json()
    return usuario.users
}

/**
 * Devuelve los usuarios asociados al género favorito
 * @param genero género favorito del usuario
 * @returns Lista de usuarios
 */
export async function getUsuarioByGenero(genero: any): Promise<Usuario[]> {
    let res = await fetch(llamadaBasica + '/usuario/getusuario/genero/' + genero);
    let usuario = await res.json()
    return usuario.users
}

/**
 * Devuelve los usuarios cuya fecha de nacimiento esté entre los dos parámetros
 * @param fechaInicio Año de inicio para la búsqueda
 * @param fechaFin Año de fin para la búsqueda
 * @returns Lista de usuarios
 */
export async function getUsuarioByFecha(fechaInicio: any, fechaFin: any): Promise<Usuario[]> {
    let res = await fetch(llamadaBasica + '/usuario/getusuario/fecha/' + fechaInicio + "/" + fechaFin);
    let usuario = await res.json()
    return usuario.users
}

/**
 * Devuelve los usuarios cuya fecha de nacimiento esté entre los dos parémetros y el ID en la lista
 * @param idUser Ids de los usuarios a buscar
 * @param fechaInicio Año de inicio para la búsqueda
 * @param fechaFin Año de fin para la búsqueda
 * @returns Lista de usuarios
 */
export async function getUsuarioByIdInDate(idUser: any, fechaInicio: any, fechaFin: any): Promise<Usuario[]> {
    let res = await fetch(llamadaBasica + '/usuario/getusuario/id/fecha/' + idUser + "/" + fechaInicio + "/" + fechaFin);
    let usuario = await res.json()
    return usuario.users
}

/**
 * Devuelve los usuarios cuyo nombre contenga la cadena especificada en el parámetro
 * @param name Subcadena a buscar
 * @returns Lista de usuarios
 */
export async function getUsuariosByName(name: any): Promise<Usuario[]> {
    let res = await fetch(llamadaBasica + '/usuario/find/' + name);
    let usuario = await res.json()
    return usuario.users
}

/**
 * Inserta un usuario en la base de datos
 * @param nombre Nombre del usuario
 * @param contraseña Contraseña del usuario
 * @param pais País del usuario
 * @param localidad Localidad del usuario
 * @param fecha_nac Fecha de nacimiento del usuario
 * @param nombre_spotify ID de Spotify del usuario
 * @param enlace_foto Enlace a la foto de perfil del usuario
 * @param descripcion Descripción del usuario
 * @param tipo Tipo de usuario
 * @param genero Género favorito del usuario
 * @param redes Enlace a las redes sociales del usuario
 * @returns Si se ha insertado o no el usuario
 */
export async function registro(nombre: string, contraseña: string, pais: string, localidad: string, fecha_nac: any, nombre_spotify: string, 
    enlace_foto: string, descripcion: string, tipo: string, genero:string, redes:string[]): Promise<any> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre, contraseña: contraseña, pais: pais, localidad: localidad, fecha_nac: fecha_nac,
             nombre_spotify: nombre_spotify, enlace_foto: enlace_foto, descripcion: descripcion, tipo: tipo, genero: genero, redes: redes })
    };
    let res = await fetch(llamadaBasica + '/usuario/register/', requestOptions);
    let usuario = await res.json()
    return usuario
}

/**
 * Comprueba que la dupla suministrada es igual a la guardada en la base de datos
 * @param nombre Nombre del usuario
 * @param contraseña Contraseña del usuario
 * @returns Si la dupla es correcta
 */
export async function inicioSesion(nombre: string, contraseña: string): Promise<any> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre, contraseña: contraseña })
    };
    let res = await fetch(llamadaBasica + '/usuario/login/', requestOptions);
    let usuario = await res.json()
    return usuario.usuario
}

/**
 * Actualiza el enlace a la foto de perfil del usuario
 * @param nombre Nombre del usuario
 * @param enlace_foto Nuevo enlace a la foto de perfil
 * @returns Si se ha actualizado la foto de perfil
 */
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

/**
 * Actualiza el usuario completo en la base de datos
 * @param nombre_anterior Nombre anterior (puede ser el mismo que el del parámetro nombre)
 * @param nombre Nombre del usuario
 * @param pais País del usuario
 * @param fecha_nac Fecha de nacimiento del usuario
 * @param nombre_spotify ID de Spotify del usuario
 * @param enlace_foto Enlace a la foto de perfil del usuario
 * @param descripcion Descripción del usuario
 * @param tipo Tipo de usuario
 * @param genero Género favorito del usuario
 * @param redes Enlace a las redes sociales del usuario
 * @returns Si se ha actualizado o no el usuario
 */
export async function actualizaUsuario(nombre_anterior: string, nombre: string, pais: string, localidad: string, fecha_nac: any, nombre_spotify: string,
    descripcion: string, tipo: string, enlace_foto: string, genero: string, redes: string[]): Promise<Boolean> {
        var requestOptions;
        if(enlace_foto !== "") {
            requestOptions = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ nombre: nombre, pais: pais, localidad: localidad, fecha_nac: fecha_nac, nombre_spotify: nombre_spotify, 
                descripcion: descripcion, enlace_foto: enlace_foto, tipo: tipo, genero: genero, redes: redes })
            };
          }
          else {
            requestOptions = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ nombre: nombre, pais: pais, localidad: localidad, fecha_nac: fecha_nac, 
                nombre_spotify: nombre_spotify, descripcion: descripcion, tipo: tipo, genero: genero, redes: redes })
            };
          }
    let res = await fetch(llamadaBasica + "/usuario/profile/edit/" + nombre_anterior, requestOptions);
    let user = await res.json()
    return user.actualizado
}

/**
 * Comprueba si el token pasado es válido para detectar si es un robot
 * @param token Token a comprobar
 * @returns Si es un robot o no
 */
export async function reCaptchaGoogle(token: string): Promise<boolean> {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({token: token})
    };
    const res = await fetch(llamadaBasica + "/usuario/captcha/", requestOptions);
    const dev = await res.json()
    return dev.robot
}

/**
 * Elimina un usuario de la base de datos
 * @param idUser ID del usuario a eliminar
 * @returns Si se ha podido eliminar el usuario
 */
export async function eliminarUsuario(idUser: any): Promise<boolean> {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser: idUser })
    };
    let res = await fetch(llamadaBasica + '/usuario/delete/', requestOptions);
    let borrado = await res.json()
    return borrado
}

/**
 * Devuelve qué usuarios cumplen todos los filtros
 * @param tipoUsu Tipo del usuario
 * @param pais País del usuario
 * @param fechaInicio Año de inicio para la búsqueda
 * @param fechaFin Año de fin para la búsqueda
 * @param genero Género favorito del usuario
 * @returns Lista de usuarios
 */
export async function getUsuariosByFilters(tipoUsu: string, pais: string, fechaInicio: any, fechaFin: any, genero: string): Promise<Usuario[]> {
    console.log(tipoUsu)
    console.log(pais)
    console.log(genero)
    let res = await fetch(llamadaBasica + '/usuario/getusuario/filter/' + tipoUsu + '/' + pais + '/' + fechaInicio + '/' + fechaFin + '/' + genero);
    let usuario = await res.json()
    return usuario.users
}