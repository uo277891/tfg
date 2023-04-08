import { Dayjs } from "dayjs"

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
    genero: string,
    redes: Array<string>
}

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

export type Comentario ={
    id_publicacion: string,
    id_usu_coment: string,
    fecha: Date,
    texto: String
}

export type Seguidor ={
    id_usuario: string,
    id_seguidor: string,
    fecha: Date
}

export type Signature ={
    signature: string,
    timestamp: string
}