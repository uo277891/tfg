import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Usuario } from '../interfaces/interfaces';

function UserCard (props: any) {
    return (
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Usuarios encontrados:
          </Typography>

            <List >
                {props.usuarios.map((usuario: Usuario) => 
                    <ListItem
                    secondaryAction={
                        <Link href={'/profile/' + usuario._id} underline="none">
                            <Button className="boton" variant="contained">Ver perfil</Button>
                        </Link>
                    }
                    >
                    <ListItemAvatar>
                        <Avatar>
                        <FolderIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary = {usuario.nombre}
                        secondary = "Artista"
                    />
                    </ListItem>
                )}
            </List>

        </Grid>
        );
}

export default UserCard;