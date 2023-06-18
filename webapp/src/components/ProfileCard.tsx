import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getSignature } from '../conector/apiCloudinary';
import { actualizaFoto } from '../conector/apiUsuarios';
import {parseFecha} from '../util/parseFecha';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

/**
 * Devuelve un componente que renderiza un perfil de usuario 
 * @param props usuario recibido desde la página
 * @returns Representación del usuario
 */
function CardProfile (props: any) {

    const [open, setOpen] = React.useState(false);

    const [idUser, setIdUser] = useLocalStorage('idUser', '')

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
     * Permite eliminar la foto de perfil del usuario
     */
    async function handleEliminar() {
        await getSignature(idUser)
        await actualizaFoto(props.usuario.nombre, "https://res.cloudinary.com/ddtcz5fqr/image/upload/v1685798226/default_olkdoe.jpg")
        setOpen(false);
    }

    return (
            <Card sx={{ padding: "0.5em", margin: "auto", maxWidth: 400, minHeight:200 }} id="profileCard">
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
                    {t("register.date")}: {parseFecha(props.usuario.fecha_nac.replace(/T/, ' ').replace(/\..+/, ''))}
                    </Typography>
                    <Typography variant="body1" color="text.secondary"> {t("register.country")}: {props.usuario.pais} </Typography>
                    <Typography variant="body1" color="text.secondary"> {t("register.location")}: {props.usuario.localidad} </Typography>
                    <Typography variant="body1" color="text.secondary"> {t("profile.spotify")} {props.usuario.nombre_spotify} </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: "space-between"}}>
                    <Button href="/profile/edit" size="large" variant="contained">{t("button.edit")}</Button>
                    <Button size="large" variant="contained" color='error' onClick={handleClickOpen}>{t("button.deletePhoto")}</Button>
                </CardActions>
                <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>{t("profile.delete")}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            {t("profile.deleteText")}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>{t("button.cancel")}</Button>
                            <Button onClick={handleEliminar}>{t("button.confirm")}</Button>
                        </DialogActions>
                </Dialog>
            </Card>
        );
}

export default CardProfile;