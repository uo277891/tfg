import {model, Schema}  from 'mongoose'

const seguidorSchema = new Schema({
    id_usuario:{
        type: String,
        require: true
    },id_seguidor:{
        type: String,
        require: true
    },fecha:{
        type: Date,
        require: true
    }
})

const seguidorModel = model('seguidores', seguidorSchema)

module.exports = seguidorModel