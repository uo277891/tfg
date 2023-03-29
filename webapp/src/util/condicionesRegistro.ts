
const errores: string[] = ["Algún campo está vacío", "Las contraseñas no coiciden", "La contraseña debe tener un mínimo de 8 caracteres"]

export function cumpleRegistro(userName:string, password: string, passwordConf: string, country:string){
    if(userName === "" || password === "" || passwordConf === "" || country === ""){
        return 0
    }
    else if(!(password === passwordConf)) {
        return 1
    }
    else if(password.length < 8) {
        return 2
    }
    return -1;
}

export function errorUsuario(codigoError: number){
    return errores[codigoError];
}