import { useState, useCallback, useEffect } from "react";
import { getUsuario } from "../accesoApi/apiUsuarios";
import { Comentario, Usuario } from "../interfaces/interfaces";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import { Grid, Link } from '@mui/material';
import Button from '@mui/material/Button';
import Textarea from '@mui/base/TextareaAutosize';
import { añadirRespuestaComentario, getRespuestaComentario } from "../accesoApi/apiComentarios";

const CommentCard = (props: any) => {

  const [usuarioPublicacion, setUsuarioPublicacion] = useState<Usuario>();

  const [usuarioRespuesta, setUsuarioRespuesta] = useState<Usuario>();

  const [comentariosRespuesta, setComentariosRespuesta] = useState<Comentario[]>([]);

  const [idUser, setIdUser] = useLocalStorage('idUser', '')

  const [text, setText] = useState("");

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

  async function comentar() {
    await añadirRespuestaComentario(props.comentario._id, props.comentario.id_publicacion, idUser, props.comentario.id_usu_coment, text)
    await datosIniciales();
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
          {props.respuesta && usuarioRespuesta !== undefined && <Typography variant="body1" fontSize={13}> En respuesta a
            <Typography display={'inline'} fontSize={14} color="blue" fontStyle="italic" variant="overline"> {usuarioRespuesta.nombre}: </Typography>
            <Typography variant="body1" fontSize={17}>{props.comentario.texto}</Typography>
          </Typography>}
          {!props.respuesta && <Typography variant="body1" fontSize={17}>{props.comentario.texto}</Typography>}
          <Textarea color="neutral" minRows={5} style={{ width: '100%', fontSize:'1em' }} placeholder="Responder" id="texto" onChange={(text) => setText(text.target.value)} value={text}/>
          {text.length > 0 && <Button className="boton" variant="contained" sx={{justifyContent: "space-between"}} onClick={comentar}>Comentar</Button>}
        </CardContent>
        {comentariosRespuesta.map((comentario: Comentario) => 
              <CommentCard respuesta = {true} comentario = {comentario}></CommentCard>
          )}
      </Card>
    );
  }
  else{
    return (<h1>No se han podido cargar los comentarios</h1>)
  }
}

export default CommentCard;