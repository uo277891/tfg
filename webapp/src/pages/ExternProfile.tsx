import { useState, useCallback, useEffect } from "react";
import { useLocalStorage } from "../localStorage/useLocalStorage";
import logo from '../images/default_user_image.png';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import PublicationCard from "../components/PublicationCard";
import { getPublicaciones, getSeguidores } from "../accesoApi/api";
import { useParams } from 'react-router-dom';
import { Publicacion, Seguidor } from "../interfaces/interfaces";

const ExternProfile = () => {

    const {id} = useParams();

    const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

    const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);

    const [cargando, setCargando] = useState<Boolean>(true);

    const [seguidores, setSeguidores] = useState<Seguidor[]>([]);

    const datosIniciales = useCallback(async () => {
        setSeguidores(await getSeguidores(id))
        setPublicaciones(await getPublicaciones(id))
        setCargando(false)
    }, []);

    useEffect(() => {
        datosIniciales();
    }, [])

    if(usuarioEstaAutenticado && !cargando){
        return (
        <div id="externProfile">
            <main>
                <TableContainer>
                    <Table sx={{ maxWidth: 800, minWidth: 200 }}>
                        <TableHead>
                        <TableRow>
                        <TableCell align="center"></TableCell>
                            <TableCell sx={{fontSize: 20}} align="center">Publicaciones</TableCell>
                            <TableCell sx={{fontSize: 20}} align="center">Seguidores</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="center">
                            <Avatar
                                alt="Foto de perfil"
                                src={logo}
                                sx={{ width: 50, height: 60 }}
                            />
                            </TableCell>
                            <TableCell sx={{fontSize: 40}} align="center">{publicaciones.length}</TableCell>
                            <TableCell sx={{fontSize: 40}} align="center">{seguidores.length}</TableCell>
                            <TableCell sx={{fontSize: 40}} align="center"><Button size="large" variant="contained">Seguir</Button></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <h2>Nombre de usuario</h2>
                <p>Descripción</p>
                <h1>Publicaciones:</h1>
                <section id="publicaciones">
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                        {publicaciones.map((publicacion: Publicacion) => 
                            <Grid item xs={4}>
                                <PublicationCard publication={publicacion}></PublicationCard>
                            </Grid>
                        )}
                    </Grid>
                </section>
            </main>
        </div>
        );
    }else{
        return(
        <div id="externProfile">
            <main>
            <h1>Inicia sesión para poder ver perfiles ajenos.</h1>
            </main>
        </div>
        )
    }
}

export default ExternProfile;