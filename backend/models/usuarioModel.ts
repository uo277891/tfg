const mongooseBD = require('mongoose')
const {Schema}  = mongooseBD

const usuarioSchema = new Schema({
    _id:{
        type: String,
        require: true
    },nombre:{
        type: String
    },apellidos:{
        type: String
    }
})

const usuariosModel = mongooseBD.model('usuarios', usuarioSchema)

module.exports = usuariosModel