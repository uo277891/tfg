import React, { useContext } from "react";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Textarea from '@mui/base/TextareaAutosize';
import Collapse from '@mui/material/Collapse';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import { useNavigate } from "react-router-dom";

const llamadaBase = "http://localhost:5000/"
const NewPublication = () => {

    const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

    const[text, setText] = React.useState("");

    const[error, setError] = React.useState("");

    const [publicationError, setPublicationError] = React.useState(false);

    const [publicationCreated, setPublicationCreated] = React.useState(false);

    const [publicationText, setPublicationText] = React.useState("");

    const [idUser, setidUser] = useLocalStorage('idUser', '')

    const redirigir = useNavigate();

    const crearPublicacion = () => {
        if(text === ""){
            setPublicationError(true);
            setPublicationCreated(false);
            setError("Se debe escribir algo en el texto para crear la publicación.");
        }
        else{
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ texto: text, id_usuario: idUser })
        };
          fetch(llamadaBase + "publicaciones/new", requestOptions)
            .then((response) => 
            {
              response.json()
              if(response.ok){
                setPublicationError(false);
                setPublicationCreated(true);
                setPublicationText("Publicación creada correctamente.")
                redirigir("/profile")
              }
              else{
                setPublicationError(true);
                setPublicationCreated(false);
                setError("Ha ocurrido un error al crear la publicación. Inténtelo más tarde");
              }
            })
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

            <Box sx={{ width: '100%' }}>
            <Collapse in={publicationCreated}>
                <Alert
                    severity="success"
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setPublicationCreated(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                >
                {publicationCreated}
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