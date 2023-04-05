import { Box, Typography } from '@mui/material';

function StatCard (props: any) {

    return (
        <Box>
            <Typography component='div'>Tu cuenta es mayoritariamente seguida por seguidores cuy{props.fem} {props.tipo} es
                <Typography variant='h4' display={'inline'}> "{props.est1}" </Typography>
                <Typography display={'inline'}> con un porcentaje del</Typography>
                <Typography display={'inline'} variant="h4"> {props.prob1}%. </Typography>
            </Typography>

            <Typography component='div'>En el segundo escalón están lo seguidores cuy{props.fem} {props.tipo} es
                <Typography variant='h4' display={'inline'}> "{props.est2}" </Typography>
                <Typography display={'inline'}> con un porcentaje del </Typography>
                <Typography display={'inline'} variant="h4"> {props.prob2}%. </Typography>
            </Typography>

            <Typography component='div'>Por último, hay una serie de seguidores cuy{props.fem} {props.tipo} es
                <Typography variant='h4' display={'inline'}> "{props.est3}", </Typography>
                <Typography display={'inline'}> cuyo porcentaje representa el  </Typography>
                <Typography display={'inline'} variant="h4"> {props.prob3}% </Typography>
                <Typography display={'inline'}> del total. </Typography>
            </Typography>
        </Box>
        );
}

export default StatCard;