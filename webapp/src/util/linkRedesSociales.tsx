import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

function RedesSociales(props: any) {
	return(
        props.redes.map((red: string, index: number) => 
            <Link href={red} underline='none'>
                <IconButton>
                    {index === 0 && <InstagramIcon sx={{ fontSize: 40 }} color = "secondary"/>}
                    {index === 1 && <TwitterIcon sx={{ fontSize: 40 }} color = "info"/>}
                    {index === 2 && <YouTubeIcon sx={{ fontSize: 40 }} color = "error"/>}
                </IconButton>
            </Link>
        )
    )
}

export default RedesSociales;
