const mongooseBD = require('mongoose')
const {Schema}  = mongooseBD

const pruebaSchema = new Schema({
    _id:{
        type: String,
        require: true
    },nombre:{
        type: String
    },apellidos:{
        type: String
    }
})

const pruebaModel = mongooseBD.model('usuarios', pruebaSchema)

module.exports = pruebaModel