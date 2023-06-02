import * as React from 'react';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { eliminarPublicacion } from '../accesoApi/apiPublicaciones';
import { borrarPublicacion } from '../accesoApi/apiCloudinary';
import {parseFecha} from '../util/parseFecha';

function PublicationCard (props: any) {

    const [idUser, setIdUser] = useLocalStorage('idUser', '')

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    async function handleEliminar() {
        await borrarPublicacion(props.publication._id)
        await eliminarPublicacion(props.publication._id, idUser)
        setOpen(false);
        window.location.reload()
    }

    return (
        <Card className='dataSpo'>
            {props.publication.tipo_multimedia === "iframe" && <audio controls src={props.publication.enlace_multimedia}></audio>}
            {(props.publication.tipo_multimedia === "img") &&
            <CardMedia component= {props.publication.tipo_multimedia} image={props.publication.enlace_multimedia}/>}
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
                <Link href={"/publication/" + props.publication._id} underline="none"><Button id = {"pub" + props.numeroPub} size="small" variant="contained">Detalles</Button></Link>
                {props.propiaPublicacion && <Button id = {"elim" + props.numeroPub} color = 'error' size="small" variant="contained" onClick={handleClickOpen}>Eliminar</Button>}
            </CardActions>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirmar eliminación</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    La publicación, junto con sus me gusta y comentarios, será eliminada del sistema.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button id="confirmar" onClick={handleEliminar}>Confirmar</Button>
                </DialogActions>
              </Dialog>
        </Card>
        );
}

export default PublicationCard;