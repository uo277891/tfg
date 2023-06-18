import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useLocalStorage } from "../localStorage/useLocalStorage";

/**
 * Devuelve un componente que renderiza un artista 
 * @param props artista recibido desde la página
 * @returns Representación del artista
 */
const ArtistCard = (props: any) => {

    const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

    const { i18n, t } = useTranslation()

    useEffect(() => {
        i18n.changeLanguage(idioma)
    }, [])

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
            <Typography variant='h4'>{t("spoCards.pop")}<Typography variant='h5' display={'inline'}>{props.artista.popularity}</Typography></Typography>
            <Typography variant='h4'>{t("spoCards.seg")}<Typography variant='h5' display={'inline'}>{props.artista.followers.total}</Typography></Typography>
            <Typography variant='h4'>{t("spoCards.genres")}<Typography variant='h5' display={'inline'}>{listadoGeneros()}</Typography></Typography>
        </CardContent>
        <CardActions sx={{justifyContent: "space-between"}}>
            <Button sx={{ margin: "auto" }} href={props.artista.external_urls.spotify} className="boton" size="large" variant="contained">{t("spoCards.artistLink")}</Button>
        </CardActions>
    </Card>
  );
}

export default ArtistCard;