import {model, Schema}  from 'mongoose'

const comentarioSchema = new Schema({
    id_publicacion:{
        type: String
    },id_usu_coment:{
        type: String,
        require: true
    },texto:{
        type: String,
        require: true
    },fecha:{
        type: Date,
        require: true
    },id_comment:{
        type: String
    },id_usu_respond:{
        type: String
    }
})

const comentarioModel = model('comentarios', comentarioSchema)

module.exports = comentarioModel