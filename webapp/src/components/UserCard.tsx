import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Grid, Typography } from '@mui/material';

function UserCard (props: any) {

    return (
            <ListItem
                secondaryAction={
                    <Link href={'/profile/' + props.usuario._id} underline="none">
                        <Button className="boton" variant="contained">Ver perfil</Button>
                    </Link>
                }
                >
                <ListItemAvatar>
                    <Avatar src= {props.usuario.enlace_foto}></Avatar>
                </ListItemAvatar>
                <ListItemText primary = {props.usuario.nombre} secondary = {props.usuario.tipo}></ListItemText>
                <Grid container sx={{ maxWidth: 900}} justifyContent="left">
                    <Typography sx = {{fontWeight: 'bold'}}>{props.usuario.genero}</Typography>
                </Grid>
            </ListItem>
        );
}

export default UserCard;