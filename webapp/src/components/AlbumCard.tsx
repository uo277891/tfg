import { Button, Link } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { parseFecha } from '../util/parseFecha';

/**
 * Devuelve un componente que renderiza un álbum 
 * @param props álbum recibido desde la página
 * @returns Representación del álbum
 */
const AlbumCard = (props: any) => {

    function listadoArtistas () {
        var artistas = ""
        props.album.artists.map( (artista: any) => {
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
            image={props.album.images[0].url}
        />
        <CardContent>
            <Typography>{props.album.name}</Typography>
            <Typography variant='h4'>Fecha de lanzamiento: <Typography variant='h5' display={'inline'}>{parseFecha(props.album.release_date)}</Typography></Typography>
            <Typography variant='h4'>Número de canciones: <Typography variant='h5' display={'inline'}>{props.album.total_tracks}</Typography></Typography>
            <Typography variant='h4'>Artistas que participan: <Typography variant='h5' display={'inline'}>{listadoArtistas()}</Typography></Typography>
        </CardContent>
        <CardActions>
            <Button sx={{ margin: "auto" }} href={props.album.external_urls.spotify} className="boton" size="large" variant="contained">Ver álbum en Spotify</Button>
        </CardActions>
    </Card>
  );
}

export default AlbumCard;