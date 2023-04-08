import React, { ChangeEvent, useContext } from "react";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Textarea from '@mui/base/TextareaAutosize';
import Collapse from '@mui/material/Collapse';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { actualizaPublicacion, añadirPublicacion, getSignature, uploadMultimedia } from "../accesoApi/api";

const llamadaBase = "http://localhost:5000/"
const NewPublication = () => {

    const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

    const[text, setText] = React.useState("");

    const[error, setError] = React.useState("");

    const [publicationError, setPublicationError] = React.useState(false);

    const [archivo, setArchivo] = React.useState<File>();

    const [idUser, setidUser] = useLocalStorage('idUser', '')

    const redirigir = useNavigate();

    const actualizaArchivo = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if(e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png" || e.target.files[0].type === "audio/mpeg"){
                setArchivo(e.target.files[0]);
            }
            else{
                setPublicationError(true);
                setError("La multimedia debe tener extensión png, jpg o mp3");
                setArchivo(undefined);
            }
        }
      };

    async function crearPublicacion(){
        if(text === "") {
            setPublicationError(true);
            setError("Se debe escribir algo en el texto para crear la publicación.");
        }
        else {
            const pub = await añadirPublicacion(idUser, text, "", "txt")
            if(archivo !== undefined){
                const respuesta = await uploadMultimedia(pub._id, archivo, false, false)
                if(respuesta !== ""){
                    const url_multimedia = respuesta
                    var tipo_multimedia = ""
                    if(archivo.type === "audio/mpeg")
                        tipo_multimedia = "iframe"
                    else
                        tipo_multimedia = "img"
                    const fotoAct = await actualizaPublicacion(pub._id, url_multimedia, tipo_multimedia)
                    if(fotoAct)
                            redirigir('/profile/' + idUser)
                        else{
                            setPublicationError(true);
                            setError("La publicación se ha creado, pero la multimedia no ha podido ser añadida.");
                        }
                }else{
                    setPublicationError(true);
                    setError("La publicación se ha creado, pero la multimedia no ha podido ser añadida.");
                }
            }
            else if(pub !== undefined)
                redirigir('/profile/' + idUser)
            else{
                setPublicationError(true);
                setError("Ha ocurrido un error, la publicación no ha podido ser creada.");
            }
          }
    }

    if(usuarioEstaAutenticado){
        return (
            <div id="newPublication" className="forms">
            <main>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 3, width: '40ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <h1>Nueva publicación</h1>
                    <Textarea color="neutral" style={{ width: 665, fontSize:'1.4em' }} minRows={10} placeholder="Introduce el texto de la publicación (máximo 200 caracteres)" 
                        id="texto" onChange={(text) => setText(text.target.value)} value={text}/>
                    <br></br>
                    {text.length} / 200
                    <br/>
                    <br/>
                        ¡Añade una foto o un audio a tu publicación! <input type="file" onChange={actualizaArchivo} />
                    <br/>
                    <br/>
                    <Button className="boton" variant="contained" onClick={crearPublicacion}>Crear publicación</Button>
                </Box>
            </main>
            <Box sx={{ width: '100%' }}>
            <Collapse in={publicationError}>
                <Alert
                    severity="error"
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setPublicationError(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                >
                {error}
                </Alert>
            </Collapse>
            </Box>

            </div>
        );
    }
    else{
        return (<h1>Inicia sesión para crear publicaciones</h1>)
    }
}

export default NewPublication;