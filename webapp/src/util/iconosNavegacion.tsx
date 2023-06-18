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
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useTranslation } from 'react-i18next';

/**
 * Devuelve el icono asociado a un nombre
 * @param props Nombre referido al icono
 * @returns Icono asociado
 */
function Icono(props: any) {

    const { t } = useTranslation()

	if(props.icono === t("navBar.follow"))
        return (<SupervisedUserCircleIcon sx={{color: common.white}}></SupervisedUserCircleIcon>)
    if(props.icono === t("navBar.follows"))
        return (<SentimentSatisfiedAltIcon sx={{color: common.white}}></SentimentSatisfiedAltIcon>)
    else if(props.icono === t("navBar.find"))
        return (<SearchIcon sx={{color: common.white}}></SearchIcon>)
    else if(props.icono === t("navBar.newPub"))
        return (<AddCircleIcon sx={{color: common.white}}></AddCircleIcon>)
    else if(props.icono === t("navBar.about"))
        return (<HelpOutlineIcon sx={{color: common.white}}></HelpOutlineIcon>)
    else if(props.icono === t("navBar.idSpo"))
        return (<MusicNoteIcon sx={{color: common.white}}></MusicNoteIcon>)
    else if(props.icono === t("navBar.dataSpo"))
        return (<AssessmentIcon sx={{color: common.white}}></AssessmentIcon>)
    else if(props.icono === t("navBar.profile"))
        return (<AccountCircleIcon sx={{color: common.white}}></AccountCircleIcon>)
    else if(props.icono === t("navBar.logout"))
        return (<LogoutIcon sx={{color: common.white}}></LogoutIcon>)
    else if(props.icono === t("navBar.stats"))
        return (<AutoGraphIcon sx={{color: common.white}}></AutoGraphIcon>)
    else if(props.icono === "Filtro")
        return (<FilterAltIcon></FilterAltIcon>)
    else if(props.icono === t("navBar.delete"))
        return (<HighlightOffIcon sx={{color: common.white}}></HighlightOffIcon>)
    else if(props.icono === "Dejar de seguir")
        return (<PersonOffIcon sx={{color: common.white}}></PersonOffIcon>)
    else if(props.icono === "Seguir")
        return (<PersonAddIcon sx={{color: common.white}}></PersonAddIcon>)
    
    return <p></p>
}

export default Icono;
