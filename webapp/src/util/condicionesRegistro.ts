import  Dayjs  from "dayjs";
import DOMPurify from 'dompurify';

const errores: string[] = ["Algún campo está vacío", "Las contraseñas no coinciden", "La contraseña debe tener un mínimo de 8 caracteres", 
"Debes tener más de 16 años y menos de 150", "La descripción debe ser de máximo 200 caracteres", "El nombre de usuario no puede ser mayor de 15 caracteres ni tener espacios",
"La localidad no puede ser mayor de 25 caracteres", "La contraseña incluye algún caractér no permitido", "La descripción incluye algún caractér no permitido",
"La localidad incluye algún caractér no permitido", "El nombre incluye algún caractér no permitido"]

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
export function cumpleRegistro(userName:string, password: string, passwordConf: string, country:string, location:string, date: any, descripcion: string){
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
    else if(userName.length > 15 || userName.includes(" "))
        return 5;
    else if(location.length > 25)
        return 6;
    return -1;
}

/**
 * Devuelve el mensaje de error asociado al código
 * @param codigoError Código de error
 * @returns Mensaje asociado
 */
export function errorUsuario(codigoError: number){
    return errores[codigoError];
}