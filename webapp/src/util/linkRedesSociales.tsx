import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import Tooltip from '@mui/material/Tooltip';

/**
 * Devuelve los iconos de las redes sociales
 * @param props Redes sociales
 * @returns Lista de iconos
 */
function RedesSociales(props: any) {
	return(
        props.redes.map((red: string, index: number) => 
            {red !== "" && <IconButton href={red}>
                {index === 0 && red !== "" && <Tooltip title="Enlace Instagram"><InstagramIcon sx={{ fontSize: 40 }} color = "secondary"/></Tooltip>}
                {index === 1 && red !== "" && <Tooltip title="Enlace Twitter"><TwitterIcon sx={{ fontSize: 40 }} color = "info"/></Tooltip>}
                {index === 2 && red !== "" && <Tooltip title="Enlace YouTube"><YouTubeIcon sx={{ fontSize: 40 }} color = "error"/></Tooltip>}
            </IconButton>}
        )
    )
}

export default RedesSociales;
