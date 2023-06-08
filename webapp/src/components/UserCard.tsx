import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';

/**
 * Devuelve un componente que renderiza una represetnación de los datos del usuario
 * @param props usuario recibido desde la página
 * @returns Representación del usuario
 */
function UserCard (props: any) {

    return (
        <Link href={'/profile/' + props.usuario._id} underline="none" color={"black"}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar alt= {"Foto de perfil de " + props.usuario.nombre} src= {props.usuario.enlace_foto}></Avatar>
                </ListItemAvatar>
                    <ListItemText primary = {props.usuario.nombre} 
                        secondary={
                            <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body1"
                                color="text.primary"
                            >
                                {props.usuario.tipo} 
                            </Typography>
                            {" - " + props.usuario.genero}
                            </React.Fragment>
                            }>
                    </ListItemText>
            </ListItem>
            </Link>
        );
}

export default UserCard;