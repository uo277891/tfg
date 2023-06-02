import * as React from 'react';
import { useState, useCallback, useEffect } from "react";
import { useLocalStorage } from "../localStorage/useLocalStorage";
import { añadirComentario, getComentarios } from "../accesoApi/apiComentarios";
import { actualizarLikes, getPublicacion } from "../accesoApi/apiPublicaciones";
import { getUsuario } from "../accesoApi/apiUsuarios";
import { useParams } from 'react-router-dom';
import { Comentario, Publicacion, Usuario } from "../interfaces/interfaces";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
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
import CommentCard from "../components/CommentCard";
import Button from '@mui/material/Button';
import Textarea from '@mui/base/TextareaAutosize';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {parseFecha, parseHora} from '../util/parseFecha';
import SimboloCarga from '../components/SimboloCarga';
import { Link } from '@mui/material';

const Publication = (props: any) => {

    var {id} = useParams();

    const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

    const [idUser, setIdUser] = useLocalStorage('idUser', '')

    const[text, setText] = React.useState("");

    const [publicacion, setPublicacion] = useState<Publicacion>();

    const [usuarioPublicacion, setUsuarioPublicacion] = useState<Usuario>();

    const [comentarios, setComentarios] = useState<Comentario[]>([]);

    const [cargando, setCargando] = useState<Boolean>(false);

    const [colorCorazon, setColorCorazon] = useState<string>("");

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      setText("");
    };

    interface ExpandMoreProps extends IconButtonProps {
        expand: boolean;
      }
      
      const ExpandMore = styled((props: ExpandMoreProps) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));

    const [expanded, setExpanded] = React.useState(false);
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const datosIniciales = useCallback(async () => {
      if(usuarioEstaAutenticado){
          if(id === undefined)
            id = props.id_publicacion
          setCargando(true)
          const pub = await getPublicacion(id)
          if(pub !== undefined){
              setPublicacion(pub)
              const user = await getUsuario(pub.id_usuario)
              if(user !== undefined)
                  setUsuarioPublicacion(user[0])
              setColorCorazon(pub.likes.indexOf(idUser) === -1 ? "grey" : "red");
              setComentarios(await getComentarios(pub._id))
          }
          setCargando(false)
      }
      setCargando(false)
    }, []);

    useEffect(() => {
        datosIniciales();
    }, [])

    async function handleLike(){
        var likesActualizados: String[] = []
        if(publicacion !== undefined){
            likesActualizados = publicacion.likes
            const posicion = likesActualizados.indexOf(idUser);
            if(posicion === -1){
                likesActualizados.push(idUser)
                setColorCorazon("red")
            }
            else{
                likesActualizados.splice(posicion, 1);
                setColorCorazon("grey")
            }
            await actualizarLikes(publicacion._id, likesActualizados)
        }
    }

    async function enviarComentario(){
      if(publicacion !== undefined && usuarioEstaAutenticado && text.length > 0){
          await añadirComentario(publicacion._id, idUser, text)
          setOpen(false);
          setText("");
          await datosIniciales();
      }
    }

  if(cargando)
    return (<SimboloCarga open={cargando} close={!cargando}></SimboloCarga>)

  else if(usuarioEstaAutenticado && publicacion !== undefined && usuarioPublicacion !== undefined){
    return (
      <div id="profile">
        <Card sx={{ margin: "auto", maxWidth: 600, minHeight:200 }}>
        <Link href = {"/profile/" + publicacion.id_usuario} underline="none" color="inherit"><CardHeader
          avatar={
            <Button><Avatar alt="Foto de perfil"
            src={usuarioPublicacion.enlace_foto}/></Button>
          }
          title={usuarioPublicacion.nombre}
          subheader={parseFecha(publicacion.fecha.toString().replace(/T/, ' ').replace(/\..+/, '')) +
        ", " + parseHora(publicacion.fecha.toString().replace(/T/, ' ').replace(/\..+/, '')) }
        /></Link>
        {publicacion.tipo_multimedia === "iframe" && <audio controls src={publicacion.enlace_multimedia}></audio>}
        {publicacion.tipo_multimedia === "img" &&
        <CardMedia
            component= {publicacion.tipo_multimedia}
            image={publicacion.enlace_multimedia}
        />}
        <CardContent>
          <Typography variant="body1" fontSize={22}>
            {publicacion.texto}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <Tooltip title="Me gusta">
            <IconButton onClick={handleLike} id="meGusta" aria-label="add to favorites">
              <FavoriteIcon style={{color: colorCorazon}} />
            </IconButton>
          </Tooltip>
          <Typography variant="body1" color="text.primary" fontSize={20}>
            {publicacion.likes.length}
          </Typography>
          <Tooltip title="Añadir comentario">
            <IconButton onClick={handleClickOpen} aria-label="add comment">
              <AddCommentIcon style={{color: "blue"}}/>
            </IconButton>
          </Tooltip>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Añadir comentario</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Atención: El comentario será público para todas las personas que puedan visualizar la publicación.
              </DialogContentText>
              <Textarea color="neutral" style={{ width: 550, fontSize:'1.4em' }} minRows={10} placeholder="Introducir comentario (máximo 200 caracteres)" 
                    id="texto" onChange={(text) => setText(text.target.value)} value={text}/>
                {text.length} / 200
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancelar</Button>
              {text.length > 0 && text.length < 200 && <Button onClick={enviarComentario}>Publicar</Button>}
            </DialogActions>
          </Dialog>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <Tooltip title="Ver comentarios">
                <ExpandMoreIcon />
              </Tooltip>
            </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            Comentarios:
            {comentarios.map((comentario: Comentario, index: number) => 
              <CommentCard key={"com" + index} comentario = {comentario}></CommentCard>
            )}
          </CardContent>
        </Collapse>
        </Card>
      </div>
    )
  }else if(!usuarioEstaAutenticado){
    return(
    <div id="externProfile">
        <main>
        <h1>Inicia sesión para poder ver perfiles ajenos.</h1>
        </main>
    </div>
    )
  }
  else{
      return(
      <div id="externProfile">
          <main>
            <h1>Publicación no disponible.</h1>
          </main>
      </div>
      )
  }
}

export default Publication;