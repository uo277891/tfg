import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { common } from '@mui/material/colors';

/**
 * Devuelve el icono asociado a un nombre
 * @param props Nombre referido al icono
 * @returns Icono asociado
 */
function Icono(props: any) {
	if(props.icono === "Siguiendo")
        return (<SupervisedUserCircleIcon sx={{color: common.white}}></SupervisedUserCircleIcon>)
    if(props.icono === "Tus seguidores")
        return (<SentimentSatisfiedAltIcon sx={{color: common.white}}></SentimentSatisfiedAltIcon>)
    else if(props.icono === "Buscar usuarios")
        return (<SearchIcon sx={{color: common.white}}></SearchIcon>)
    else if(props.icono === "Crear publicación")
        return (<AddCircleIcon sx={{color: common.white}}></AddCircleIcon>)
    else if(props.icono === "Sobre SocialFS")
        return (<HelpOutlineIcon sx={{color: common.white}}></HelpOutlineIcon>)
    else if(props.icono === "Obtener ID Spotify")
        return (<MusicNoteIcon sx={{color: common.white}}></MusicNoteIcon>)
    else if(props.icono === "Datos de Spotify")
        return (<AssessmentIcon sx={{color: common.white}}></AssessmentIcon>)
    else if(props.icono === "Perfil")
        return (<AccountCircleIcon sx={{color: common.white}}></AccountCircleIcon>)
    else if(props.icono === "Cerrar Sesión")
        return (<LogoutIcon sx={{color: common.white}}></LogoutIcon>)
    else if(props.icono === "Estadísticas")
        return (<AutoGraphIcon sx={{color: common.white}}></AutoGraphIcon>)
    else if(props.icono === "Filtro")
        return (<FilterAltIcon></FilterAltIcon>)
    else if(props.icono === "Eliminar Cuenta")
        return (<HighlightOffIcon sx={{color: common.white}}></HighlightOffIcon>)
    
    return <p></p>
}

export default Icono;
