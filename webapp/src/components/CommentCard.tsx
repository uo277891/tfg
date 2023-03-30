import { red } from '@mui/material/colors';
import { useState, useCallback, useEffect } from "react";
import { actualizarLikes, añadirComentario, getComentarios, getPublicacion, getUsuario } from "../accesoApi/api";
import { Comentario, Publicacion, Usuario } from "../interfaces/interfaces";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Textarea from '@mui/base/TextareaAutosize';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useLocalStorage } from "../localStorage/useLocalStorage";

const CommentCard = (props: any) => {

  const [usuarioPublicacion, setUsuarioPublicacion] = useState<Usuario>();

  const [idUser, setIdUser] = useLocalStorage('idUser', '')

  const datosIniciales = useCallback(async () => {
    const user = await getUsuario(idUser)
    if(user !== undefined)
        setUsuarioPublicacion(user[0])
  }, []);

  useEffect(() => {
      datosIniciales();
  }, [])

  if(usuarioPublicacion !== undefined){
    return (
      <Card sx={{ maxWidth: 600, m: 1.5 }}>
        <CardHeader
                avatar={
                  <Avatar alt="Foto de perfil"
                  src={usuarioPublicacion.enlace_foto}/>
                }
                title={usuarioPublicacion.nombre}
                subheader={props.comentario.fecha.toString().replace(/T/, ' ').replace(/\..+/, '')}
        />
        <CardContent>
          <Typography variant="body1" fontSize={17}>
            {props.comentario.texto}
          </Typography>
        </CardContent>
      </Card>
    );
  }
  else{
    return (<h1>No se han podido cargar los comentarios</h1>)
  }
}

export default CommentCard;