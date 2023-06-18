import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useLocalStorage } from "../localStorage/useLocalStorage";

/**
 * Devuelve un componente que renderiza una represetnación de los datos del usuario
 * @param props usuario recibido desde la página
 * @returns Representación del usuario
 */
function UserCard (props: any) {

    const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

    const { i18n, t } = useTranslation()

    useEffect(() => {
        i18n.changeLanguage(idioma)
    }, [])

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
                                {t("userCard." + props.usuario.tipo)} 
                            </Typography>
                            {" - " + t("userCard." + props.usuario.genero)}
                            </React.Fragment>
                            }>
                    </ListItemText>
            </ListItem>
            </Link>
        );
}

export default UserCard;