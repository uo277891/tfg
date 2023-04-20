import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';

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
                <ListItemText primary = {props.usuario.nombre} 
                    secondary={
                        <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {props.usuario.tipo} 
                        </Typography>
                        {" - " + props.usuario.genero}
                        </React.Fragment>
                        }>
                </ListItemText>
            </ListItem>
        );
}

export default UserCard;