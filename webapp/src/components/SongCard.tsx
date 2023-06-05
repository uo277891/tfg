import { Button, Link } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { parseDuracion, parseFecha } from '../util/parseFecha';

/**
 * Devuelve un componente que renderiza una canción 
 * @param props canción recibida desde la página
 * @returns Representación de la canción
 */
const SongCard = (props: any) => {

    function listadoArtistas () {
        var artistas = ""
        props.cancion.artists.map( (artista: any) => {
            artistas += artista.name + ", "
        })
        return artistas.substring(0, artistas.length - 2)
    }
  return (
    <Card sx={{ padding: "0.5em", margin: "auto", maxWidth: 500, minHeight:200 }} id="albumCard">
        <CardMedia 
            sx={{ margin: "auto", maxWidth: 400, minHeight:200 }}
            component="img"
            alt="foto de perfil"
            image={props.cancion.album.images[0].url}
        />
        <CardContent>
            <Typography>{props.cancion.name}</Typography>
            {props.cancion.album.album_type === 'album' && <Typography variant='h4'>Álbum al que pertenece: <Typography variant='h5' display={'inline'}>{props.cancion.album.name}</Typography></Typography>}
            <Typography variant='h4'>Fecha de lanzamiento: <Typography variant='h5' display={'inline'}>{parseFecha(props.cancion.album.release_date)}</Typography></Typography>
            <Typography variant='h4'>Popularidad: <Typography variant='h5' display={'inline'}>{props.cancion.popularity}</Typography></Typography>
            <Typography variant='h4'>Duración: <Typography variant='h5' display={'inline'}>{parseDuracion(props.cancion.duration_ms)}</Typography></Typography>
            <Typography variant='h4'>Artistas que participan: <Typography variant='h5' display={'inline'}>{listadoArtistas()}</Typography></Typography>
            <Typography variant='h4'>Extracto de la canción:</Typography> <audio controls src={props.cancion.preview_url}></audio>
        </CardContent>
        <CardActions>
            <Link sx={{ margin: "auto" }} href={props.cancion.external_urls.spotify} underline="none"><Button className="boton" size="large" variant="contained">Ver canción en Spotify</Button></Link>
        </CardActions>
    </Card>
  );
}

export default SongCard;