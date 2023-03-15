import logo from '../images/default_user_image.png';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';

const llamadaBase = "http://localhost:5000/usuario/"

function PublicationCard (props: any) {
    return (
        <Card sx={{ maxWidth: 400 }} id="profileCard">
            <CardMedia
                sx={{maxHeight: 250}} 
                component="img"
                alt="foto de perfil"
                image={logo}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                Descripción de la publicación realizada por el artista o promotor.
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                Fecha: 15/03/2023
                </Typography>
                <Typography variant="body1" color="text.secondary">
                <FavoriteIcon sx={{color: red[500]}}></FavoriteIcon> 20
                </Typography>
            </CardContent>
            <CardActions>
                <Link href="/publication/" underline="none"><Button size="large" variant="contained">Detalles</Button></Link>
            </CardActions>
        </Card>
        );
}

export default PublicationCard;