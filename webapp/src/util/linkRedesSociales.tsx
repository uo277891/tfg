import Link from '@mui/material/Link';
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
            <Link href={red} underline='none'>
                <IconButton>
                    {index === 0 && <Tooltip title="Enlace Instagram"><InstagramIcon sx={{ fontSize: 40 }} color = "secondary"/></Tooltip>}
                    {index === 1 && <Tooltip title="Enlace Twitter"><TwitterIcon sx={{ fontSize: 40 }} color = "info"/></Tooltip>}
                    {index === 2 && <Tooltip title="Enlace YouTube"><YouTubeIcon sx={{ fontSize: 40 }} color = "error"/></Tooltip>}
                </IconButton>
            </Link>
        )
    )
}

export default RedesSociales;
