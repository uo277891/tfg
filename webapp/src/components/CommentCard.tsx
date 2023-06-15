import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useCallback, useEffect } from "react";
import { getUsuario } from "../conector/apiUsuarios";
import { Comentario, Usuario } from "../interfaces/interfaces";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import { Alert, Box, CardActions, Collapse, IconButton, Link } from '@mui/material';
import Button from '@mui/material/Button';
import Textarea from '@mui/base/TextareaAutosize';
import { añadirRespuestaComentario, eliminarComentarioYRespuestas, getRespuestaComentario } from "../conector/apiComentarios";
import DOMPurify from 'dompurify';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Devuelve un componente que renderiza un comentario o una respuesta 
 * @param props comentario o respuesta recibido desde la página
 * @returns Representación del comentario
 */
const CommentCard = (props: any) => {

  const [usuarioPublicacion, setUsuarioPublicacion] = useState<Usuario>();

  const [usuarioRespuesta, setUsuarioRespuesta] = useState<Usuario>();

  const [comentariosRespuesta, setComentariosRespuesta] = useState<Comentario[]>([]);

  const [idUser, setIdUser] = useLocalStorage('idUser', '')

  const [text, setText] = useState("");

  const [open, setOpen] = React.useState(false);

  const [commentError, setCommentError] = React.useState(false);

  const [error, setError] = useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Carga el usuario asociado al comentario y las respuestas que tiene ese comentario
   */
  const datosIniciales = useCallback(async () => {
    const user = await getUsuario(props.comentario.id_usu_coment)
    if(props.respuesta){
      const userRes = await getUsuario(props.comentario.id_usu_respond)
      if(userRes !== undefined){
        setUsuarioRespuesta(userRes[0])
    }
    }
    if(user !== undefined){
        setUsuarioPublicacion(user[0])
    }
    setComentariosRespuesta(await getRespuestaComentario(props.comentario._id))
  }, []);

  useEffect(() => {
      datosIniciales();
  }, [])

  /**
   * Permite añadir una respuesta al comentario
   */
  async function comentar() {
    const textLimpio = DOMPurify.sanitize(text)
    if(textLimpio === text && textLimpio.length > 0 && textLimpio.length < 201){
      await añadirRespuestaComentario(props.comentario._id, props.comentario.id_publicacion, idUser, props.comentario.id_usu_coment, text)
      await datosIniciales();
    }else if(textLimpio !== text){
      setCommentError(true)
      setError("Se ha detectado texto inválido. Revíselo por favor")
    }
  }

  /**
   * Permite eliminar el comentario y sus respuestas
   */
  async function eliminarComentario() {
    await eliminarComentarioYRespuestas(props.comentario._id)
    handleClose();
    window.location.reload()
  }

  if(usuarioPublicacion !== undefined){
    var idCom = "commentCard"
    if(props.respuesta) idCom = "commentCardRes"
    return (
      <Card sx={{ maxWidth: '100%', m: 1.5 }} id={idCom}>
        <Link href = {"/profile/" + usuarioPublicacion._id} underline="none" color="inherit"><CardHeader
                avatar={
                  <Button><Avatar alt="Foto de perfil"
                  src={usuarioPublicacion.enlace_foto}/></Button>
                }
                title={usuarioPublicacion.nombre}
                subheader={props.comentario.fecha.toString().replace(/T/, ' ').replace(/\..+/, '')}
        /></Link>
        <CardContent>
          {props.respuesta && usuarioRespuesta !== undefined && <Typography variant="h6"> En respuesta a
            <Typography display={'inline'} color="blue" fontStyle="italic" variant="h6"> {usuarioRespuesta.nombre}: </Typography>
            <Typography variant="h5">{props.comentario.texto}</Typography>
          </Typography>}
          {!props.respuesta && <Typography variant="h5">{props.comentario.texto}</Typography>}
          <Textarea color="neutral" minRows={5} style={{ width: '100%', fontSize:'1em' }} aria-label="Texto del comentario" placeholder="Responder" id="texto" onChange={(text) => setText(text.target.value)} value={text}/>
                {text.length + " / 200"}
        </CardContent>
        <CardActions sx={{justifyContent: "space-between"}}>
          {(usuarioPublicacion._id === idUser || props.idUsuPub === idUser) && <Button variant="contained" color="error" onClick={handleClickOpen}>Eliminar comentario</Button>}
          {text.length > 0 && text.length < 201 &&<Button aria-label="Comentar" className="boton" variant="contained" onClick={comentar}>Comentar</Button>}
        </CardActions>
        <Box sx={{ width: '100%' }}>
            <Collapse in={commentError}>
                <Alert
                    severity="error"
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setCommentError(false);
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
        {comentariosRespuesta.map((comentario: Comentario) => 
              <CommentCard key = {comentario._id} respuesta = {true} comentario = {comentario} idUsuPub = {props.idUsuPub}></CommentCard>
        )}
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alerta-eliminacion-title"
        aria-describedby="alerta-eliminacion-description"
      >
        <DialogTitle id="alerta-eliminacion-title">
          {"¿Desea eliminar este comentario?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alerta-eliminacion-description">
            El comentario será eliminado y no podrá deshacer esta acción.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={eliminarComentario} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      </Card>
      
    );
  }
  else{
    return (<h1>No se han podido cargar los comentarios</h1>)
  }
}

export default CommentCard;