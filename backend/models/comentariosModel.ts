import {model, Schema}  from 'mongoose'

const comentarioSchema = new Schema({
    id_publicacion:{
        type: String,
        require: true
    },id_usu_coment:{
        type: String,
        require: true
    },texto:{
        type: String,
        require: true
    },fecha:{
        type: Date,
        require: true
    }
})

const comentarioModel = model('comentarios', comentarioSchema)

module.exports = comentarioModel