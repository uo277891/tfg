import { Signature } from "../interfaces/interfaces";

const llamadaBasica = 'http://localhost:5000';

/**
 * Borrar foto de perfil del usuario de la base de Cloudinary
 * @param idUser Id del usuario
 * @returns Si se pudo borrar la foto de perfil
 */
export async function getSignature(idUser: any): Promise<Signature> {
    let res = await fetch(llamadaBasica + '/cloudinary/signature/' + idUser);
    let respuesta = await res.json()
    return respuesta
}

/**
 * Borrar multimedia de una publicación de la base de Cloudinary
 * @param idPub Id de la publicación
 * @returns Si se pudo borrar la multimedia
 */
export async function borrarPublicacion(idPub: any): Promise<Signature> {
    let res = await fetch(llamadaBasica + '/cloudinary/publicacion/delete/' + idPub);
    let respuesta = await res.json()
    return respuesta
}

/**
 * Borrar multimedia de varias publicaciones de la base de Cloudinary
 * @param idPubs Ids de las publicaciones
 * @returns Si se pudo borrar la multimedia
 */
export async function borrarPublicaciones(idPubs: any): Promise<Signature> {
    let res = await fetch(llamadaBasica + '/cloudinary/publicaciones/delete/' + idPubs);
    let respuesta = await res.json()
    return respuesta
}

/**
 * Subir multimedia a la base de Cloudinary
 * @param idUser Id del usuario o de la publicación
 * @param archivo Archivo multimedia a subir
 * @param perfiles Indica si el archivo debe ir a la carpeta de perfiles o de publicaciones
 * @param eliminarFoto Indica si es necesario eliminar la foto asociada al ID antes de subir la nueva
 * @returns Si se pudo insertar la multimedia
 */
export async function uploadMultimedia(idUser: string, archivo: File, perfiles:boolean, eliminarFoto: boolean): Promise<string>{
    let data = new FormData();
    var url_foto = ""
    if(eliminarFoto)
        await getSignature(idUser)
    const cloudinaryURI = process.env.REACT_APP_CLOUDINARY_URL
    const api_key = process.env.REACT_APP_CLOUDINARY_API_KEY
    var upload_preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_PERFILES
    if(!perfiles)
        upload_preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_PUBLICACIONES
    if(api_key !== undefined && upload_preset !== undefined){
        data.append("file", archivo);
        data.append("api_key", api_key);
        data.append('upload_preset', upload_preset);
        data.append("public_id", idUser);
        const params = {
            method: 'POST',
            body: data
        };
        await fetch(cloudinaryURI + "upload", params)
            .then(async (response) => 
            {
            if(response.ok){
                console.log("Correcto")
                const url = await response.json()
                url_foto = url.secure_url
                return url_foto;
            }
            else{
                if(perfiles)
                    url_foto = process.env.REACT_APP_CLOUDINARY_DEFAULT_FOTO + ""
            }
            })
    }
    return url_foto
}