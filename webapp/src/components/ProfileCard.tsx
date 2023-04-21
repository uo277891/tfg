import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getSignature } from '../accesoApi/apiCloudinary';
import { actualizaFoto } from '../accesoApi/apiUsuarios';
import {parseFecha} from '../util/parseFecha';

function CardProfile (props: any) {

    const [open, setOpen] = React.useState(false);

    const [idUser, setIdUser] = useLocalStorage('idUser', '')

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    async function handleEliminar() {
        await getSignature(idUser)
        await actualizaFoto(props.usuario.nombre, "https://res.cloudinary.com/ddtcz5fqr/image/upload/v1679309731/perfiles/default_user_image_a8y5kc")
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
                    Fecha de nacimiento: {parseFecha(props.usuario.fecha_nac.replace(/T/, ' ').replace(/\..+/, ''))}
                    </Typography>
                    <Typography variant="body1" color="text.secondary"> Nacionalidad: {props.usuario.pais} </Typography>
                    <Typography variant="body1" color="text.secondary"> Localidad: {props.usuario.localidad} </Typography>
                    <Typography variant="body1" color="text.secondary"> Perfil de Spotify: {props.usuario.nombre_spotify} </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: "space-between"}}>
                    <Link href="/profile/edit" underline="none"><Button size="large" variant="contained">Editar</Button></Link>
                    <Button size="large" variant="contained" color='error' onClick={handleClickOpen}>Eliminar foto de perfil</Button>
                </CardActions>
                <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Confirmar eliminación</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            ¿Está seguro de eliminar su foto de perfil? Se le aplicará una foto de perfil determinada y podrá volver a elegir su foto editando su usuario
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancelar</Button>
                            <Button onClick={handleEliminar}>Confirmar</Button>
                        </DialogActions>
                </Dialog>
            </Card>
        );
}

export default CardProfile;