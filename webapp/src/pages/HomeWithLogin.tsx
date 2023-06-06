import { useCallback, useEffect, useState } from "react";
import { Publicacion } from "../interfaces/interfaces";
import SimboloCarga from "../components/SimboloCarga";
import { getPublicacionWithLimit } from "../accesoApi/apiPublicaciones";
import Grid from "@mui/material/Grid";
import Publication from "./Publication";
import { Box, Button } from "@mui/material";

/**
 * @returns Página para representar el inicio de un usuario identificado
 */
const HomeWithLogin = () => {

    const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);

    const [cargando, setCargando] = useState<Boolean>(false);

    const [saltarPubs, setSaltarPubs] = useState<number>(0);

    const datosIniciales = useCallback(async () => {
        setCargando(true)
        setPublicaciones(await getPublicacionWithLimit(saltarPubs))
        setCargando(false)
    }, []);

    useEffect(() => {
        datosIniciales();
    }, [])

    async function cargarMasPublicaciones(){
        setCargando(true)
        const num = saltarPubs + 10
        setSaltarPubs(num)
        var publicacionesActuales = publicaciones
        const masPublicaciones = await getPublicacionWithLimit(num)
        masPublicaciones.map((publicacion: Publicacion) => {publicacionesActuales.push(publicacion)})
        setPublicaciones(publicacionesActuales)
        setCargando(false)
    }

    if(cargando)
        return (<SimboloCarga open={cargando} close={!cargando}></SimboloCarga>)
    else
        return (
            <div id="profile">
            <main>
                <h1>Últimas publicaciones</h1>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {publicaciones.map((publicacion: Publicacion, index: number) => 
                            <Grid key={"pub" + (index + saltarPubs)} item xs={12}>
                                <Publication id_publicacion = {publicacion._id}></Publication>
                            </Grid>
                        )}
                </Grid>
                <Box textAlign='center'>
                    <Button className="boton" variant="contained" onClick={cargarMasPublicaciones}>Cargar más</Button>
                </Box>
            </main>
            </div>
        );
}

export default HomeWithLogin;