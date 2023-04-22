import { useState, useCallback, useEffect } from "react";
import { getUsuario } from "../accesoApi/apiUsuarios";
import { Usuario } from "../interfaces/interfaces";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import { Link } from '@mui/material';
import Button from '@mui/material/Button';

const CommentCard = (props: any) => {

  const [usuarioPublicacion, setUsuarioPublicacion] = useState<Usuario>();

  const [idUser, setIdUser] = useLocalStorage('idUser', '')

  const datosIniciales = useCallback(async () => {
    const user = await getUsuario(props.comentario.id_usu_coment)
    if(user !== undefined)
        setUsuarioPublicacion(user[0])
  }, []);

  useEffect(() => {
      datosIniciales();
  }, [])

  if(usuarioPublicacion !== undefined){
    return (
      <Card sx={{ maxWidth: 600, m: 1.5 }}>
        <Link href = {"/profile/" + usuarioPublicacion._id} underline="none" color="inherit"><CardHeader
                avatar={
                  <Button><Avatar alt="Foto de perfil"
                  src={usuarioPublicacion.enlace_foto}/></Button>
                }
                title={usuarioPublicacion.nombre}
                subheader={props.comentario.fecha.toString().replace(/T/, ' ').replace(/\..+/, '')}
        /></Link>
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