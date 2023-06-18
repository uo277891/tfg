import  Dayjs  from "dayjs";
import DOMPurify from 'dompurify';

const errores: string[] = ["Algún campo está vacío", "Las contraseñas no coinciden", "La contraseña debe tener un mínimo de 8 caracteres", 
"Debes tener más de 16 años y menos de 150", "La descripción debe ser de máximo 200 caracteres", "El nombre de usuario no puede ser mayor de 15 caracteres",
"La localidad no puede ser mayor de 25 caracteres", "La contraseña incluye algún caractér no permitido", "La descripción incluye algún caractér no permitido",
"La localidad incluye algún caractér no permitido", "El nombre incluye algún caractér no permitido", "Debe aceptar las condiciones de tratamiento para crear una cuenta", 
"El nombre solo puede contener números letras minúsculas y '_' y debe comenzar con una letra", "La localidad solo puede contener letras"]

const erroresIngles: string[] = ["Some field is empty", "Passwords do not match", "Password must be at least 8 characters",
"You must be older than 16 and younger than 150 years old", "Description must be 200 characters maximum", "Username cannot be longer than 15 characters", "Locality cannot be longer than 25 characters",
"The password includes any impermissible characters", "The description includes any impermissible characters", "The locale includes any impermissible characters",
"The name includes any impermissible characters", "You must accept the processing conditions to create an account", 
"The name can only contain numbers, lowercase letters and '_' and must start with a letter", "The locale can only contain letters"]

/**
 * Comprueba si el nombre tiene un formato válido
 * @param nombre Nombre del usuario
 * @returns True si el nombre es válido y false en caso contrario
 */
function nombreValido(nombre: string) {
    return /^[a-z]+[a-z0-9_]*$/.test(nombre);
}

/**
 * Comprueba si el nombre tiene un formato válido
 * @param localidad Localidad del usuario
 * @returns True si el nombre es válido y false en caso contrario
 */
function localidadValida(localidad: string) {
    return /^[a-zA-Z]*$/.test(localidad);
}

/**
 * Comprueba si los datos introducidos por el usuario son válidos
 * @param userName Nombre del usuario
 * @param password Contraseña
 * @param passwordConf Contraseña repetida
 * @param country País de nacimiento
 * @param location Localización 
 * @param date Fecha de nacimiento
 * @param descripcion Descripción
 * @returns -1 si no hay fallos o un número entre 0 y 6 en caso contrario
 */
export function cumpleRegistro(userName:string, password: string, passwordConf: string, country:string, location:string, date: any, descripcion: string, rgpd:boolean){
    const dateNow = Dayjs()
    const contLimpia= DOMPurify.sanitize(password), descripcionLimpia = DOMPurify.sanitize(descripcion), 
    localidadLimpia = DOMPurify.sanitize(location), nombreLimpio = DOMPurify.sanitize(userName)
    if(contLimpia !== password)
        return 7
    if(descripcionLimpia !== descripcion)
        return 8
    if(localidadLimpia !== location)
        return 9
    if(nombreLimpio !== userName)
        return 10
    if(date === undefined)
        return 3;
    else if(userName === "" || password === "" || passwordConf === "" || country === ""){
        return 0;
    }
    else if(!(password === passwordConf)) {
        return 1;
    }
    else if(password.length < 8) {
        return 2;
    }
    else if(dateNow.diff(date, "days") < 5840 ||  dateNow.diff(date, "days") > 54750) {
        return 3;
    }
    else if(descripcion.length > 200)
        return 4;
    else if(userName.length > 15)
        return 5;
    else if(location.length > 25)
        return 6;
    else if(!nombreValido(userName))
        return 12
    else if(!localidadValida(location))
        return 13
    else if(!rgpd)
        return 11
    return -1;
}

/**
 * Devuelve el mensaje de error asociado al código
 * @param codigoError Código de error
 * @returns Mensaje asociado
 */
export function errorUsuario(codigoError: number, idioma:string){
    if(idioma === "es")
        return errores[codigoError];
    else
        return erroresIngles[codigoError];
}