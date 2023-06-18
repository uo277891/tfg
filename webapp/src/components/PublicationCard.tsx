import * as React from 'react';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { eliminarPublicacion } from '../conector/apiPublicaciones';
import { borrarPublicacion } from '../conector/apiCloudinary';
import {parseFecha} from '../util/parseFecha';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

/**
 * Devuelve un componente que renderiza una publicación 
 * @param props publicación recibida desde la página
 * @returns Representación de la publicación
 */
function PublicationCard (props: any) {

    const [idUser, setIdUser] = useLocalStorage('idUser', '')

    const [open, setOpen] = React.useState(false);

    const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

    const { i18n, t } = useTranslation()

    useEffect(() => {
        i18n.changeLanguage(idioma)
    }, [])

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    /**
    * Permite eliminar la publicación 
    */
    async function handleEliminar() {
      await borrarPublicacion(props.publication._id)
      await eliminarPublicacion(props.publication._id, idUser)
      setOpen(false);
      window.location.reload()
    }

    return (
        <Card className='dataSpo'>
            {props.publication.tipo_multimedia === "iframe" && <audio title='Audio publicación' controls src={props.publication.enlace_multimedia}></audio>}
            {(props.publication.tipo_multimedia === "img") &&
            <CardMedia alt="Imagen publicacion" title="Imagen publicacion" component= {props.publication.tipo_multimedia} image={props.publication.enlace_multimedia}/>}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {props.publication.texto}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                {parseFecha(props.publication.fecha.replace(/T/, ' ').replace(/\..+/, ''))}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                <FavoriteIcon sx={{color: red[500]}}></FavoriteIcon> {props.publication.likes.length}
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: "space-between"}}>
                <Button href={"/publication/" + props.publication._id} id = {"pub" + props.numeroPub} size="small" variant="contained">{t("button.details")}</Button>
                {props.propiaPublicacion && <Button id = {"elim" + props.numeroPub} color = 'error' size="small" variant="contained" onClick={handleClickOpen}>{t("button.delete")}</Button>}
            </CardActions>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t("pubCard.title")}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {t("pubCard.text")}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>{t("button.cancel")}</Button>
                  <Button id="confirmar" onClick={handleEliminar}>{t("button.confirm")}</Button>
                </DialogActions>
              </Dialog>
        </Card>
        );
}

export default PublicationCard;