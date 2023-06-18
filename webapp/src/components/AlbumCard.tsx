import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { parseFecha } from '../util/parseFecha';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useLocalStorage } from "../localStorage/useLocalStorage";

/**
 * Devuelve un componente que renderiza un álbum 
 * @param props álbum recibido desde la página
 * @returns Representación del álbum
 */
const AlbumCard = (props: any) => {

    const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

    const { i18n, t } = useTranslation()

    useEffect(() => {
        i18n.changeLanguage(idioma)
    }, [])

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
            <Typography variant='h4'>{t("spoCards.date")}<Typography variant='h5' display={'inline'}>{parseFecha(props.album.release_date)}</Typography></Typography>
            <Typography variant='h4'>{t("spoCards.num")}<Typography variant='h5' display={'inline'}>{props.album.total_tracks}</Typography></Typography>
            <Typography variant='h4'>{t("spoCards.artists")}<Typography variant='h5' display={'inline'}>{listadoArtistas()}</Typography></Typography>
        </CardContent>
        <CardActions>
            <Button sx={{ margin: "auto" }} href={props.album.external_urls.spotify} className="boton" size="large" variant="contained">{t("spoCards.albumLink")}</Button>
        </CardActions>
    </Card>
  );
}

export default AlbumCard;