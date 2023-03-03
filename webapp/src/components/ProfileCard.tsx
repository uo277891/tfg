import * as React from 'react';
import logo from '../images/default_user_image.png';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Dayjs } from 'dayjs';
import { useLocalStorage } from "../localStorage/useLocalStorage";

const llamadaBase = "http://localhost:5000/usuario/"

function CardProfile () {

  const[userName, setUserName] = React.useState("");

  const[country, setCountry] = React.useState("");

  const[location, setLocation] = React.useState("");

  const[nomSpoty, setNomSpoty] = React.useState("");

  const[enlaceFoto, setEnlaceFoto] = React.useState("");

  const [date, setDate] = React.useState<Dayjs | null>();

  const [usuarioAutenticado, setUsuarioAutenticado] = useLocalStorage('user', '')

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
  };
    fetch(llamadaBase + "getusuario/" + usuarioAutenticado, requestOptions)
      .then( async (response) => 
      {
        if(response.ok){
          var user = await response.json()
          setUserName(user.user.nombre)
          setNomSpoty(user.user.nombre_spotify)
          setCountry(user.user.pais)
          setLocation(user.user.localidad)
          setDate(user.user.fecha_nac)
        }
        else{
          return <h1>ERROR</h1>
        }
      })

      return (
            <Card sx={{ margin: "auto", maxWidth: 400, minHeight:200 }} id="profileCard">
              {enlaceFoto === "" && <CardMedia 
                  component="img"
                  alt="foto de perfil"
                  image={logo}
              />}
              <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {userName}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                  Fecha de nacimiento: {date}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                  Nacionalidad: {country}
                  <br/>
                  Localidad: {location}
                  <br/>
                  Perfil de Spotify: {nomSpoty}
                  </Typography>
              </CardContent>
              <CardActions>
                  <Link href="/profile/edit" underline="none"><Button size="large" variant="contained">Editar</Button></Link>
              </CardActions>
          </Card>
          );
}

export default CardProfile;