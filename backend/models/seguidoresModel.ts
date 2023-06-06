import {model, Schema}  from 'mongoose'

/**
 * Esquema general para un documento en la colección de seguidores
 */
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