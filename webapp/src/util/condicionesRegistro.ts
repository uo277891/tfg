import  Dayjs  from "dayjs";

const errores: string[] = ["Algún campo está vacío", "Las contraseñas no coiciden", "La contraseña debe tener un mínimo de 8 caracteres", 
"Debes tener más de 16 años y menos de 150", "La descripción debe ser de máximo 200 caracteres", "El nombre de usuario no puede ser mayor de 15 caracteres ni tener espacios",
"La localidad no puede ser mayor de 25 caracteres"]

export function cumpleRegistro(userName:string, password: string, passwordConf: string, country:string, location:string, date: any, descripcion: string){
    const dateNow = Dayjs()
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

export function errorUsuario(codigoError: number){
    return errores[codigoError];
}