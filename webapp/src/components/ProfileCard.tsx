import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function CardProfile (props: any) {
  return (
        <Card sx={{ margin: "auto", maxWidth: 400, minHeight:200 }} id="profileCard">
          <CardMedia 
              component="img"
              alt="foto de perfil"
              image={props.usuario.enlace_foto}
          />
          <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              {props.usuario.nombre}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
              Fecha de nacimiento: {props.usuario.fecha_nac}
              </Typography>
              <Typography variant="body1" color="text.secondary">
              Nacionalidad: {props.usuario.pais}
              <br/>
              Localidad: {props.usuario.localidad}
              <br/>
              Perfil de Spotify: {props.usuario.nombre_spotify}
              </Typography>
          </CardContent>
          <CardActions>
              <Link href="/profile/edit" underline="none"><Button size="large" variant="contained">Editar</Button></Link>
          </CardActions>
      </Card>
      );
}

export default CardProfile;