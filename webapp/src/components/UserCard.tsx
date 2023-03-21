import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import FolderIcon from '@mui/icons-material/Folder';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

async function getFoto() {
    
}

function UserCard (props: any) {

    const cloudinaryURI = "https://res.cloudinary.com/ddtcz5fqr/image/upload/v1679309731/perfiles/" + props.usuario.enlace_foto
    const params = {
    method: 'GET'
    };
    
    return (
            <ListItem
            secondaryAction={
                <Link href={'/profile/' + props.usuario._id} underline="none">
                    <Button className="boton" variant="contained">Ver perfil</Button>
                </Link>
            }
            >
            <ListItemAvatar>
                <Avatar src= {"https://res.cloudinary.com/ddtcz5fqr/image/upload/v1679309731/perfiles/" + props.usuario.enlace_foto}>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary = {props.usuario.nombre}
                secondary = "Artista"
            />
            </ListItem>
        );
}

export default UserCard;