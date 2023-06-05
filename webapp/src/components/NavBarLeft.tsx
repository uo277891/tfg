import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Link from "@mui/material/Link";
import iconlogo from "../images/iconLogoBlanco.png";
import { useLocalStorage } from "../localStorage/useLocalStorage";
import { useState, useCallback, useEffect } from "react";
import { eliminarUsuario, getUsuario } from "../accesoApi/apiUsuarios";
import { Publicacion, Usuario } from "../interfaces/interfaces";
import Avatar from '@mui/material/Avatar';
import Icono from '../util/iconosNavegacion';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { eliminarSeguimientos } from '../accesoApi/apiSeguidores';
import { eliminarComentariosUsuario } from '../accesoApi/apiComentarios';
import { eliminarPublicacionesUsuario, getPublicaciones } from '../accesoApi/apiPublicaciones';
import { getSignature, borrarPublicacion, borrarPublicaciones } from '../accesoApi/apiCloudinary';
import { useNavigate } from "react-router-dom";
import SimboloCarga from './SimboloCarga';

const nombrePagina = ['Sobre SocialFS', "Obtener ID Spotify", "Datos de Spotify"];
const linkPagina = ['aboutSocialfs', 'idspotify', 'spotify/explanation/']

const paginasInicioSesion = ['Siguiendo', 'Tus seguidores', 'Buscar usuarios','Crear publicación'];
const linkPaginaInicioSesion = ['follow', 'follow/you', 'find', 'publication/new']

var hashmap = new Map();

function agregarPaginas(){
    for(let i = 0; i < nombrePagina.length; i++){
      hashmap.set(nombrePagina[i], linkPagina[i]);
    }
  
    for(let i = 0; i < paginasInicioSesion.length; i++){
      hashmap.set(paginasInicioSesion[i], linkPaginaInicioSesion[i]);
    }
  }
  agregarPaginas();
  
  function linkAsociado (pagina:string){
    return hashmap.get(pagina)
  }

export default function NestedList(props: any) {

    const [open, setOpen] = React.useState(true);

    const [dialog, setDialog] = React.useState(false);

    const [cargando, setCargando] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setDialog(false);
    };

    const handleClick = () => {
        setDialog(true);
    };

    const [usuarioAutenticado, setUsuarioAutenticado] = useLocalStorage('user', '')

    const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

    const [idUser, setIdUser] = useLocalStorage('idUser', '')
    
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const [usuario, setUsuario] = useState<Usuario>();

    const [width, setWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, []);

    const datosIniciales = useCallback(async () => {
        if(usuarioEstaAutenticado){
            const user = await getUsuario(idUser)
            if(user != undefined)
                setUsuario(user[0])
        }
    }, []);

    useEffect(() => {
        datosIniciales();
    }, [])

    const handleCerrarSesion = () => {
        setAnchorElUser(null);
        setUsuarioAutenticado("");
        setUsuarioEstaAcutenticado(false);
        setIdUser("")
    };

    const redirigir = useNavigate();

    const handleEliminarCuenta = async () => {
        if(usuarioEstaAutenticado){
            setCargando(true)
            await eliminarSeguimientos(idUser)
            await eliminarComentariosUsuario(idUser)
            await eliminarPublicacionesUsuario(idUser)
            await eliminarUsuario(idUser)
            await getSignature(idUser)
            handleCerrarSesion()
            setCargando(false)
            handleClose()
            redirigir("/logout")
            window.location.reload();
        }
    };

    const handleEliminarMultimedia = async () => {
        const publicaciones = await getPublicaciones(idUser, "fecha")
        let idPubs: string[] = []
        publicaciones.map((publicacion) => {
            if(publicacion.tipo_multimedia !== "txt")
                idPubs.push(publicacion._id);
        })
        if(idPubs.length === 1){
            console.log(idPubs[0])
            await borrarPublicacion(idPubs[0])
        }
        else if(idPubs.length > 0)
            await borrarPublicaciones(idPubs)
        await handleEliminarCuenta()
        handleCerrarSesion()
        handleClose()
        redirigir("/logout")
        window.location.reload();
    };

    if(cargando)
        return (<SimboloCarga open={cargando} close={!cargando}></SimboloCarga>)
    else
        return (
            <List id = "navBar" sx={{ width: '100%', height: '100%' }} component="nav" aria-labelledby="nested-list-subheader">
                    <Link key="home"
                        href="/"
                        variant="h6"
                        noWrap
                        sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
                        <img src={iconlogo} alt="Icono logo"></img>
                    </Link>
                {usuarioEstaAutenticado && paginasInicioSesion.map((nombre) => (
                    <Link key={nombre} id={nombre} underline='none' color="inherit" href={"/" + linkAsociado(nombre)}>
                        <ListItemButton>
                            <Tooltip title={nombre}>
                                <ListItemIcon>
                                    <Icono icono={nombre}></Icono>
                                </ListItemIcon>
                            </Tooltip>
                            {width > 1200 && <ListItemText primary={nombre} />}
                        </ListItemButton>
                    </Link>
                ))}
                {nombrePagina.map((nombre) => (
                    <Link key={nombre} id={nombre} underline='none' color="inherit" href={"/" + linkAsociado(nombre)}> 
                        <ListItemButton>
                            <Tooltip title={nombre}>
                                <ListItemIcon>
                                    <Icono icono={nombre}></Icono>
                                </ListItemIcon>
                            </Tooltip>
                                {width > 1200 && <ListItemText primary={nombre} />}
                        </ListItemButton>
                    </Link>
                    ))}
                {usuario !== undefined && <ListItemButton key="perfil" onClick={handleClick}>
                    <ListItemIcon>
                    <Tooltip title="Cuenta">
                        <IconButton key = "person" sx={{ p: 0 }}>
                            <Avatar sx={{ width: 30, height: 30 }} src= {usuario.enlace_foto}></Avatar>
                        </IconButton>
                    </Tooltip> 
                    </ListItemIcon>
                    { width > 1200 && <ListItemText primary="Cuenta" />}
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>}
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {usuario !== undefined && <List component="div" disablePadding>
                    <Link id="publicProfile" href={"/profile/" + idUser} underline='none' color="inherit"> 
                            <ListItemButton sx={{ pl: 4 }}>
                            <Tooltip title="Perfil">
                                <ListItemIcon>
                                    <Icono icono="Perfil"></Icono>
                                </ListItemIcon>
                            </Tooltip>
                            {width > 1200 && <ListItemText primary="Perfil" />}
                            </ListItemButton>
                        </Link>
                        <Link id="stats" href={"/stats/"} underline='none' color="inherit"> 
                            <ListItemButton sx={{ pl: 4 }}>
                            <Tooltip title="Estadísticas">
                                <ListItemIcon>
                                    <Icono icono="Estadísticas"></Icono>
                                </ListItemIcon>
                            </Tooltip>
                            {width > 1200 && <ListItemText primary="Estadísticas" />}
                            </ListItemButton>
                        </Link>
                        <Link id="cerrarSesion" href={"/logout"} onClick={handleCerrarSesion} underline='none' color="inherit"> 
                            <ListItemButton sx={{ pl: 4 }} onClick={handleCerrarSesion}>
                            <Tooltip title="Cerrar sesión">
                                <ListItemIcon onClick={handleCerrarSesion}>
                                    <Icono icono="Cerrar Sesión"></Icono>
                                </ListItemIcon>
                            </Tooltip>
                            {width > 1200 && <ListItemText primary="Cerrar Sesión" />}
                            </ListItemButton>
                        </Link>
                        <ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
                        <Tooltip title="Eliminar cuenta">
                            <ListItemIcon onClick={handleClick}>
                                <Icono icono="Eliminar Cuenta"></Icono>
                            </ListItemIcon>
                        </Tooltip>
                        {width > 1200 && <ListItemText primary="Eliminar cuenta" />}
                        </ListItemButton>
                </List>}
            </Collapse>
            <Dialog
            open={dialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Eliminación de cuenta"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                ¿Está seguro de eliminar su cuenta?, su usuario, junto con sus publicaciones y comentarios serán eliminados permanentemente.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleEliminarMultimedia} autoFocus>
                Eliminar
            </Button>
            </DialogActions>
        </Dialog>
            </List>
        );
}