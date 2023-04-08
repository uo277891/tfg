export function parseFecha (fecha: string) {
    var fechaMod = fecha.split(" ", 2)
    var dia = fechaMod[0].split("-", 3)
    return dia[2] + "/" + dia[1] + "/" + dia[0]
}

export function parseHora (fecha: string) {
    var fechaMod = fecha.split(" ", 2)
    return fechaMod[1]
}