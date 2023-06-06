import { Dayjs } from "dayjs"

/**
 * Estructura de un Usuario para conocer sus atributos esperados
 */
export type Usuario ={
    _id: string,
    nombre: string,
    contrasena: string,
    fecha_nac: Dayjs,
    localidad: string,
    pais: string,
    nombre_spotify: string,
    enlace_foto: string,
    descripcion: string,
    tipo: string,
    genero: string,
    redes: Array<string>
}

/**
 * Estructura de una Publicación para conocer sus atributos esperados
 */
export type Publicacion ={
    _id: string,
    id_usuario: string,
    texto: string,
    enlace_foto: string,
    fecha: Dayjs,
    enlace_multimedia: string,
    tipo_multimedia: string,
    likes: Array<string>
}

/**
 * Estructura de un Comentario para conocer sus atributos esperados
 */
export type Comentario ={
    _id: string,
    id_publicacion: string,
    id_usu_coment: string,
    fecha: Date,
    texto: String
}

/**
 * Estructura de un Seguidor para conocer sus atributos esperados
 */
export type Seguidor ={
    id_usuario: string,
    id_seguidor: string,
    fecha: Date
}

/**
 * Estructura de una marca de tiempo para la base de datos de Cloudinary
 */
export type Signature ={
    signature: string,
    timestamp: string
}