export function parseFecha (fecha: string) {
    var fechaMod = fecha.split(" ", 2)
    var dia = fechaMod[0].split("-", 3)
    return dia[2] + "/" + dia[1] + "/" + dia[0]
}

export function parseHora (fecha: string) {
    var fechaMod = fecha.split(" ", 2)
    return fechaMod[1]
}

export function parseDuracion (milisegundos: number) {
    const minutos = parseInt(((milisegundos / 1000) / 60) + "")
    const segundosRestantes = parseInt((milisegundos - minutos * 60 * 1000) / 1000 + "")
    return ponerCero(minutos) + ":" + ponerCero(segundosRestantes)
}

function ponerCero (numero: number) {
    if(numero < 10)
        return "0" + numero
    return numero
}