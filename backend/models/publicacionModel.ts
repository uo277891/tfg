import {model, Schema}  from 'mongoose'

const publicacionSchema = new Schema({
    id_usuario:{
        type: String,
        require: true
    },texto:{
        type: String,
        require: true
    },enlace_multimedia:{
        type: String,
    },tipo_multimedia:{
        type: String
    },fecha:{
        type: Date,
        require: true
    },
    likes:{
        type: Array
    }
})

const publicacionModel = model('publicaciones', publicacionSchema)

module.exports = publicacionModel