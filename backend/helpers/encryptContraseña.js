const bcrypt = require('bcryptjs')

const encriptar = async (contraseña) => {
    const sal = await bcrypt.hash(contraseña, 10)
    return sal;
}

const comparaContraseñas = async (contraseñaPlana, contraseñaEncriptada) => {
    const sonIguales = await bcrypt.compare(contraseñaPlana, contraseñaEncriptada)
    return sonIguales;
}

module.exports = {encriptar, comparaContraseñas}