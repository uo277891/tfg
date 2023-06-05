import { Usuario } from "../interfaces/interfaces";

const llamadaBasica = 'http://localhost:5000';

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

export async function getUsuariosByNameAndId(id_usuario: any, nombre: string): Promise<Usuario[]> {
    if(id_usuario.length === 0)
        return []
    let res = await fetch(llamadaBasica + '/usuario/getusuarios/filter/' + id_usuario + "/" + nombre);
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

export async function getUsuarioByGenero(genero: any): Promise<Usuario[]> {
    let res = await fetch(llamadaBasica + '/usuario/getusuario/genero/' + genero);
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

export async function getUsuariosByName(name: any): Promise<Usuario[]> {
    let res = await fetch(llamadaBasica + '/usuario/find/' + name);
    let usuario = await res.json()
    return usuario.users
}

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

export async function getUsuariosByFilters(tipoUsu: string, pais: string, fechaInicio: any, fechaFin: any, genero: string): Promise<Usuario[]> {
    console.log(tipoUsu)
    console.log(pais)
    console.log(genero)
    let res = await fetch(llamadaBasica + '/usuario/getusuario/filter/' + tipoUsu + '/' + pais + '/' + fechaInicio + '/' + fechaFin + '/' + genero);
    let usuario = await res.json()
    return usuario.users
}