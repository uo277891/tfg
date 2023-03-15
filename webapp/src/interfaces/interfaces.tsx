export type Usuario ={
    nombre: string,
    contrasena: string,
    fecha_nac: Date,
    localidad: string,
    pais: string,
    nombre_spotify: string
}

export type EstadoUsuario ={
    usuario: Usuario,
    sesionIniciada: boolean
}