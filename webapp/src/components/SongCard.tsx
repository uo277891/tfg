import { Button, Link } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { parseDuracion, parseFecha } from '../util/parseFecha';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useLocalStorage } from "../localStorage/useLocalStorage";

/**
 * Devuelve un componente que renderiza una canción 
 * @param props canción recibida desde la página
 * @returns Representación de la canción
 */
const SongCard = (props: any) => {

    const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

    const { i18n, t } = useTranslation()

    useEffect(() => {
        i18n.changeLanguage(idioma)
    }, [])

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
            {props.cancion.album.album_type === 'album' && <Typography variant='h4'>{t("spoCards.albumSong")}<Typography variant='h5' display={'inline'}>{props.cancion.album.name}</Typography></Typography>}
            <Typography variant='h4'>{t("spoCards.date")}<Typography variant='h5' display={'inline'}>{parseFecha(props.cancion.album.release_date)}</Typography></Typography>
            <Typography variant='h4'>{t("spoCards.pop")}<Typography variant='h5' display={'inline'}>{props.cancion.popularity}</Typography></Typography>
            <Typography variant='h4'>{t("spoCards.dur")}<Typography variant='h5' display={'inline'}>{parseDuracion(props.cancion.duration_ms)}</Typography></Typography>
            <Typography variant='h4'>{t("spoCards.artists")}<Typography variant='h5' display={'inline'}>{listadoArtistas()}</Typography></Typography>
            <Typography variant='h4'>{t("spoCards.ext")}</Typography> <audio controls src={props.cancion.preview_url}></audio>
        </CardContent>
        <CardActions>
            <Button sx={{ margin: "auto" }} href={props.cancion.external_urls.spotify} className="boton" size="large" variant="contained">{t("spoCards.songLink")}</Button>
        </CardActions>
    </Card>
  );
}

export default SongCard;