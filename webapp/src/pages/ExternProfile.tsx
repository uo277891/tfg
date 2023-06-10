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
import { getUsuario } from "../accesoApi/apiUsuarios";
import { getPublicaciones, getPublicacionesByTipo } from "../accesoApi/apiPublicaciones";
import { getSeguidores, isSeguidor, dejarDeSeguir, seguir } from "../accesoApi/apiSeguidores"
import { useParams } from 'react-router-dom';
import { Publicacion, Seguidor, Usuario } from "../interfaces/interfaces";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import React from "react";
import { Drawer, Typography } from "@mui/material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RedesSociales from "../util/linkRedesSociales";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Icono from '../util/iconosNavegacion';
import { common } from '@mui/material/colors';
import Filtro from '../components/FiltrosPublicaciones';
import SimboloCarga from "../components/SimboloCarga";
import { getFollowingUsers } from "../accesoApi/apiSeguidores";

type Anchor = 'left';

/**
 * @returns Página para representar un perfil público
 */
const ExternProfile = () => {

    const {id} = useParams();

    const [state, setState] = React.useState({left: false});

    const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

    const [idUser, setIdUser] = useLocalStorage('idUser', '')

    const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);

    const [cargando, setCargando] = useState<Boolean>(false);

    const [seguidores, setSeguidores] = useState<Seguidor[]>([]);

    const [seguidos, setSeguidos] = useState<number>(0);

    const [usuario, setUsuario] = useState<Usuario>();

    const [leSigue, setLeSigue] = useState<boolean>();

    const [page, setPage] = React.useState(1);

    const [filtroPublicacion, setFiltroPublicacion] = useState("todos");

    const [ordenadoFecha, setOrdenadoFecha] = useState("fecha");

    const [tamañoLetra, setTamañoLetra] = useState<number>(20);

    const [tamañoImagen, setTamañoImagen] = useState<number[]>([50,60]);

    const numElementos = 9

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleResize = () => {
        if(window.innerWidth < 500){
            setTamañoLetra(12)
            setTamañoImagen([25,35])
        }else if(window.innerWidth < 900){
            setTamañoLetra(14)
            setTamañoImagen([35,45])
        }else{
            setTamañoLetra(20)
            setTamañoImagen([50,60])
        }

    };

    const datosIniciales = useCallback(async () => {
        if(usuarioEstaAutenticado){
            setCargando(true)
            setSeguidores(await getSeguidores(id))
            setPublicaciones(await getPublicaciones(id, "fecha"))
            setSeguidos((await getFollowingUsers(id)).length)
            const user = await getUsuario(id)
            if(user != undefined)
                setUsuario(user[0])
            setLeSigue(await isSeguidor(id, idUser))
            setCargando(false)
        }
        setCargando(false)
    }, []);

    useEffect(() => {
        datosIniciales();
        window.addEventListener("resize", handleResize);
    }, [])

    async function handleDejarDeSeguir() {
        await dejarDeSeguir(id, idUser)
        await datosIniciales();
    }

    async function handleSeguir() {
        await seguir(id, idUser);
        await datosIniciales();
    }

    async function handleFiltro () {
        setCargando(true)
        if(filtroPublicacion !== ""){
            if(ordenadoFecha === "" || ordenadoFecha === undefined)
                setOrdenadoFecha("fecha")
            if(filtroPublicacion !== "todos"){
                const pubs = await getPublicacionesByTipo(id, filtroPublicacion, ordenadoFecha)
                setPublicaciones(pubs)
            }
            else{
                const publicaciones = await getPublicaciones(id, ordenadoFecha)
                setPublicaciones(publicaciones)
            }
        }
        setCargando(false)
    }

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
          if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
          }
    
          setState({ ...state, [anchor]: open });
        };
    
      const list = () => (
        <Box sx={{ width: 250 }}>
          <List>
            {['Tipo publicación', 'Ordenar por'].map((text, index) => (
                <Box key = {text} padding={'1em'}>
                    <Typography variant='h5' >{text}<br/>
                        <Filtro setFiltroPublicacion = {setFiltroPublicacion} setOrdenadoFecha={setOrdenadoFecha} index={index}></Filtro>
                    </Typography>
                    <Divider/>
                </Box>

            ))}
            <Divider/>
            <Box key = "buttonFilter" padding={'1em'}>
                <Button id="btFiltros" fullWidth sx={{color: common.black}} startIcon={<Icono icono="Filtro"></Icono>} onClick={() => handleFiltro()}>
                    <ListItemText primary="Aplicar filtros" />
                </Button>
            </Box>
          </List>
        </Box>
      );

    if(cargando)
        return (<SimboloCarga open={cargando} close={!cargando}></SimboloCarga>)
    else if(usuarioEstaAutenticado && !cargando && usuario !== undefined){
        return (
        <div id="externProfile">
            <main>
                <TableContainer>
                    <Table>
                        <TableHead>
                        <TableRow>
                        <TableCell align="left" sx={{fontSize: tamañoLetra}}>Foto</TableCell>
                            <TableCell sx={{fontSize: tamañoLetra}} align="center">Publicaciones</TableCell>
                            <TableCell sx={{fontSize: tamañoLetra}} align="center">Seguidores</TableCell>
                            <TableCell sx={{fontSize: tamañoLetra}} align="center">Seguidos</TableCell>
                            {tamañoLetra === 20 && <TableCell sx={{fontSize: tamañoLetra}} align="center">Genero Favorito</TableCell>}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="center">
                            <Avatar
                                alt= {"Foto de perfil de " + usuario.nombre}
                                src={usuario.enlace_foto}
                                sx={{ width: tamañoImagen[0], height: tamañoImagen[1] }}
                            />
                            </TableCell>
                            <TableCell sx={{fontSize: tamañoLetra * 2 - 5}} align="center">{publicaciones.length}</TableCell>
                            <TableCell sx={{fontSize: tamañoLetra * 2 - 5}} align="center">{seguidores.length}</TableCell>
                            <TableCell sx={{fontSize: tamañoLetra * 2 - 5}} align="center">{seguidos}</TableCell>
                            {tamañoLetra === 20 && <TableCell sx={{fontSize: tamañoLetra * 2 - 5}} align="center">{usuario.genero}</TableCell>}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                {usuario._id !== idUser && !leSigue &&<TableCell sx={{fontSize: tamañoLetra}} align="center"><Button id="seguir" size="large" variant="contained" color="info" startIcon={<Icono icono={"Seguir"}/>} onClick={handleSeguir}>Seguir</Button></TableCell>}
                {usuario._id === idUser && <TableCell sx={{fontSize: tamañoLetra}} align="center">
                        <Button href="/profile" id="editarPerfil" className="boton" variant="contained" size="large" startIcon={<Icono icono={"Perfil"}/>}>Editar perfil</Button>
                </TableCell>}
                {usuario._id !== idUser && leSigue && <TableCell sx={{fontSize: 20}} align="center"><Button startIcon={<Icono icono={"Dejar de seguir"}/>} id="dejarSeguir" size="large" variant="contained" color="warning" onClick={handleDejarDeSeguir}>Dejar de seguir</Button></TableCell>}
                {usuario.nombre_spotify !== "" && usuario.tipo !== "Estándar" && <TableCell sx={{fontSize: tamañoLetra}} align="center">
                    <Button href={"/spotify/data/" + usuario.nombre_spotify} color="success" className="boton" variant="contained" size="large" startIcon={<Icono icono={"Obtener ID Spotify"}/>}>Estadísticas Spotify</Button>
                </TableCell>}
                <h2>{usuario.nombre}</h2>
                <p>{usuario.descripcion}</p>
                {(usuario.redes[0] !== "" || usuario.redes[1] !== "" || usuario.redes[2] !== "") && <Typography variant="h4"><AutoAwesomeIcon id ="redes"></AutoAwesomeIcon>  Otras redes sociales</Typography>}
                <RedesSociales redes = {usuario.redes}></RedesSociales>
                <h1>Publicaciones:</h1>
                <div className='estiloBase'>
                    <React.Fragment key={'left'}>
                        <Button className="boton" variant="contained" onClick={toggleDrawer('left', true)}>Filtros</Button>
                        <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                            {list()}
                        </Drawer>
                    </React.Fragment>
                </div>
                <section className="publicaciones">
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {publicaciones.slice((page - 1) * numElementos, numElementos * page).map((publicacion: Publicacion, index) => 
                            <Grid key = {"pub" + index * page} item xs={4}>
                                <PublicationCard numeroPub={index} publication={publicacion} propiaPublicacion={usuario._id === idUser}></PublicationCard>
                            </Grid>
                        )}
                    </Grid>
                </section>
                <Grid container alignItems="center" justifyContent="center">
                    <Stack spacing={2}>
                        <Pagination color="secondary" count={Math.round(publicaciones.length / numElementos) + 1} page={page} onChange={handleChange} />
                    </Stack>
                </Grid>
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