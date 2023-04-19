import {model, Schema}  from 'mongoose'

const usuarioSchema = new Schema({
    nombre:{
        type: String,
        require: true,
        unique: true
    },contrasena:{
        type: String,
        require: true
    },pais:{
        type: String,
        require: true
    },localidad:{
        type: String,
    },fecha_nac:{
        type: Date,
        require: true
    },nombre_spotify:{
        type: String
    },enlace_foto:{
        type: String
    },descripcion:{
        type: String
    },tipo:{
        type: String
    },
    genero:{
        type: String
    },
    redes:{
        type: Array
    }
})

const usuariosModel = model('usuarios', usuarioSchema)

module.exports = usuariosModel