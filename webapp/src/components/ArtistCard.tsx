import { Button, Link } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const ArtistCard = (props: any) => {

    const idCss = props.artistaPropio === true ? "artistCard" : "externArtistCard"
    function listadoGeneros () {
        var generos = ""
        props.artista.genres.map( (genero: string) => {
            generos += genero + ", "
        })
        return generos.substring(0, generos.length - 2)
    }
  return (
    <Card sx={{ padding: "0.5em", margin: "auto", maxWidth: 500, minHeight:200 }} id={idCss}>
        <CardMedia 
            sx={{ margin: "auto", maxWidth: 400, minHeight:200 }}
            component="img"
            alt="foto de perfil"
            image={props.artista.images[0].url}
        />
        <CardContent>
            {!props.artistaPropio && <Typography>{props.artista.name}</Typography>}
            <Typography variant='h4'>Popularidad: <Typography variant='h5' display={'inline'}>{props.artista.popularity}</Typography></Typography>
            <Typography variant='h4'>Seguidores: <Typography variant='h5' display={'inline'}>{props.artista.followers.total}</Typography></Typography>
            <Typography variant='h4'>Géneros: <Typography variant='h5' display={'inline'}>{listadoGeneros()}</Typography></Typography>
        </CardContent>
        <CardActions sx={{justifyContent: "space-between"}}>
            <Link sx={{ margin: "auto" }} href={props.artista.external_urls.spotify} underline="none"><Button className="boton" size="large" variant="contained">Ver perfil en Spotify</Button></Link>
        </CardActions>
    </Card>
  );
}

export default ArtistCard;