import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import MicExternalOnIcon from '@mui/icons-material/MicExternalOn';
import PublicIcon from '@mui/icons-material/Public';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { common } from '@mui/material/colors';

function Icono(props: any) {
	if(props.icono === "Siguiendo")
        return (<SupervisedUserCircleIcon sx={{color: common.white}}></SupervisedUserCircleIcon>)
    else if(props.icono === "Buscar usuarios")
        return (<SearchIcon sx={{color: common.white}}></SearchIcon>)
    else if(props.icono === "Crear publicación")
        return (<AddCircleIcon sx={{color: common.white}}></AddCircleIcon>)
    else if(props.icono === "Sobre SocialFS")
        return (<HelpOutlineIcon sx={{color: common.white}}></HelpOutlineIcon>)
    else if(props.icono === "Perfil")
        return (<AccountCircleIcon sx={{color: common.white}}></AccountCircleIcon>)
    else if(props.icono === "Cerrar Sesión")
        return (<LogoutIcon sx={{color: common.white}}></LogoutIcon>)
    else if(props.icono === "Tipo artista")
        return (<MicExternalOnIcon></MicExternalOnIcon>)
    else if(props.icono === "País")
        return (<PublicIcon></PublicIcon>)
    else if(props.icono === "Rango edad")
        return (<CalendarMonthIcon></CalendarMonthIcon>)
    else if(props.icono === "Estadísticas")
        return (<AutoGraphIcon sx={{color: common.white}}></AutoGraphIcon>)
    else if(props.icono === "Filtro")
        return (<FilterAltIcon></FilterAltIcon>)
    
    return <p></p>
}

export default Icono;
