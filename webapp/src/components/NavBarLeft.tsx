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
import { getUsuario } from "../accesoApi/apiUsuarios";
import { Usuario } from "../interfaces/interfaces";
import Avatar from '@mui/material/Avatar';
import Icono from '../util/iconosNavegacion';
import Tooltip from '@mui/material/Tooltip';

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

    const handleClick = () => {
        setOpen(!open);
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
            </List>}
        </Collapse>
        </List>
    );
}