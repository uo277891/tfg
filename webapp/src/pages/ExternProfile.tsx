import { useState, useCallback, useEffect } from "react";
import { useLocalStorage } from "../localStorage/useLocalStorage";
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
import { getPublicaciones, getSeguidores, getUsuario, isSeguidor, dejarDeSeguir, seguir } from "../accesoApi/api";
import { useParams } from 'react-router-dom';
import { Publicacion, Seguidor, Usuario } from "../interfaces/interfaces";

const ExternProfile = () => {

    const {id} = useParams();

    const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

    const [idUser, setIdUser] = useLocalStorage('idUser', '')

    const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);

    const [cargando, setCargando] = useState<Boolean>(true);

    const [seguidores, setSeguidores] = useState<Seguidor[]>([]);

    const [usuario, setUsuario] = useState<Usuario>();

    const [leSigue, setLeSigue] = useState<boolean>();

    const datosIniciales = useCallback(async () => {
        setCargando(true)
        setSeguidores(await getSeguidores(id))
        setPublicaciones(await getPublicaciones(id))
        const user = await getUsuario(id)
        if(user != undefined)
            setUsuario(user[0])
        setLeSigue(await isSeguidor(id, idUser))
        setCargando(false)
    }, []);

    useEffect(() => {
        datosIniciales();
    }, [])

    async function handleDejarDeSeguir() {
        await dejarDeSeguir(id, idUser)
        await datosIniciales();
    }

    async function handleSeguir() {
        await seguir(id, idUser);
        await datosIniciales();
    }

    if(usuarioEstaAutenticado && !cargando && usuario !== undefined){
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
                                src={usuario.enlace_foto}
                                sx={{ width: 50, height: 60 }}
                            />
                            </TableCell>
                            <TableCell sx={{fontSize: 40}} align="center">{publicaciones.length}</TableCell>
                            <TableCell sx={{fontSize: 40}} align="center">{seguidores.length}</TableCell>
                            {usuario._id !== idUser && !leSigue &&<TableCell sx={{fontSize: 40}} align="center"><Button size="large" variant="contained" color="info" onClick={handleSeguir}>Seguir</Button></TableCell>}
                            {usuario._id === idUser && <TableCell sx={{fontSize: 20}} align="center">Perfil propio</TableCell>}
                            {usuario._id !== idUser && leSigue && <TableCell sx={{fontSize: 20}} align="center"><Button size="large" variant="contained" color="warning" onClick={handleDejarDeSeguir}>Dejar de seguir</Button></TableCell>}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <h2>{usuario.nombre}</h2>
                <p>{usuario.descripcion}</p>
                <h1>Publicaciones:</h1>
                <section id="publicaciones">
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                        {publicaciones.map((publicacion: Publicacion) => 
                            <Grid item xs={4}>
                                <PublicationCard publication={publicacion} propiaPublicacion={usuario._id === idUser}></PublicationCard>
                            </Grid>
                        )}
                    </Grid>
                </section>
            </main>
        </div>
        );
    }else if(!usuarioEstaAutenticado){
        return(
        <div id="externProfile">
            <main>
            <h1>Inicia sesión para poder ver perfiles ajenos.</h1>
            </main>
        </div>
        )
    }
    else{
        return(
        <div id="externProfile">
            <main>
            <h1>Usuario no encontrado.</h1>
            </main>
        </div>
        )
    }
}

export default ExternProfile;