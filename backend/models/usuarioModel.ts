const mongooseBD = require('mongoose')
const {Schema}  = mongooseBD

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
    }
})

const usuariosModel = mongooseBD.model('usuarios', usuarioSchema)

module.exports = usuariosModel