export type Usuario ={
    _id: string,
    nombre: string,
    contrasena: string,
    fecha_nac: Date,
    localidad: string,
    pais: string,
    nombre_spotify: string,
    enlace_foto: string,
    descripcion: string
}

export type Publicacion ={
    id_usuario: string,
    texto: string,
    enlace_foto: string,
    fecha: Date,
    enlace_audio: Object,
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