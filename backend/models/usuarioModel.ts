const mongooseBD = require('mongoose')
const {Schema}  = mongooseBD

const usuarioSchema = new Schema({
    _id:{
        type: String,
        require: true,
        unique: true
    },nombre:{
        type: String,
        require: true,
        unique: true
    },contraseña:{
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
    }
})

const usuariosModel = mongooseBD.model('usuarios', usuarioSchema)

module.exports = usuariosModel