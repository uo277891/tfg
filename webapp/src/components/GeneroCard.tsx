import { Box, Typography, getLinearProgressUtilityClass } from '@mui/material';

var listadoGeneros: string[] = ["FreeStyle", "Rap", "Trap", "Pop", "Rock", "Otro"]

function getPercentage(genero: string, generos: string[]){
    var contador = 0
    generos.map((gen: string) => {if(gen === genero) contador++})

    return (contador / generos.length) * 100
}

function GeneroCard (props: any) {
    listadoGeneros = listadoGeneros.filter(gen => gen !== props.genero);
    console.log(listadoGeneros)
    return (
        <Box>
            <Typography component='div'>Tu género favorito es
                <Typography variant='h4' display={'inline'}> "{props.genero}", </Typography>
                <Typography display={'inline'}> el </Typography>
                <Typography display={'inline'} variant="h4"> {getPercentage(props.genero, props.generos)}% </Typography>
                <Typography display={'inline'}> de tus seguidores escogen ese género como su favorito. </Typography>
            </Typography>

            {listadoGeneros.map((gen: string) => 
                <Typography component='div'>Un 
                    <Typography variant='h4' display={'inline'}> {getPercentage(gen, props.generos)}% </Typography>
                    <Typography display={'inline'}> de tus seguidores escogen </Typography>
                    <Typography display={'inline'} variant="h4"> "{gen}" </Typography>
                    <Typography display={'inline'}> como su género favorito. </Typography>
                </Typography>
            )}
        </Box>
        );
}

export default GeneroCard;