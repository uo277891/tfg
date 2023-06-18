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
import { eliminarUsuario, getUsuario } from "../conector/apiUsuarios";
import { Usuario } from "../interfaces/interfaces";
import Avatar from '@mui/material/Avatar';
import Icono from '../util/iconosNavegacion';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { eliminarSeguimientos } from '../conector/apiSeguidores';
import { eliminarComentariosUsuario } from '../conector/apiComentarios';
import { eliminarPublicacionesUsuario, getPublicaciones } from '../conector/apiPublicaciones';
import { getSignature, borrarPublicacion, borrarPublicaciones } from '../conector/apiCloudinary';
import { useNavigate } from "react-router-dom";
import SimboloCarga from './SimboloCarga';
import españa from "../images/españa.png"
import inglaterra from "../images/inglaterra.png"
import { useTranslation } from 'react-i18next';

const nombrePagina = ['navBar.about', "navBar.idSpo", "navBar.dataSpo"];
const linkPagina = ['aboutSocialfs', 'idspotify', 'spotify/explanation/']

const paginasInicioSesion = ['navBar.follow', 'navBar.follows', 'navBar.find','navBar.newPub'];
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

  /**
   * Renderiza la barra de navegación
   * @returns Barra de navegación
   */
export default function BarraDeNavegacion() {

    const [open, setOpen] = React.useState(true);

    const [dialog, setDialog] = React.useState(false);

    const [cargando, setCargando] = React.useState(false);

    const { i18n, t } = useTranslation()

    const cambioIdioma = (idioma:string) => {
        setIdioma(idioma)
        i18n.changeLanguage(idioma)
    }

    const handleClickOpen = () => {
        setOpen(!open);
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

    const [idioma, setIdioma] = useLocalStorage('idioma', 'es')
    
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const [usuario, setUsuario] = useState<Usuario>();

    const [width, setWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        
    }, []);

    /**
     * Carga el usuario en caso de que esté identificado
     */
    const datosIniciales = useCallback(async () => {
        if(usuarioEstaAutenticado){
            const user = await getUsuario(idUser)
            if(user != undefined)
                setUsuario(user[0])
        }
    }, []);

    useEffect(() => {
        i18n.changeLanguage(idioma)
        datosIniciales();
    }, [])

    /**
     * Cierra la sesión del usuario
     */
    const handleCerrarSesion = () => {
        setAnchorElUser(null);
        setUsuarioAutenticado("");
        setUsuarioEstaAcutenticado(false);
        setIdUser("")
        redirigir("/logout")
        window.location.reload();
    };

    const redirigir = useNavigate();

    /**
     * Elimina al usuario de la base de datos junto a todo el contenido relacionado con este
     */
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

    /**
     * Elimina la multimedia asociada al usuario
     */
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
            <List id = "navBar" sx={{ width: '100%', height: '100%' }} component="nav">
                        <Link key="home"
                            href="/"
                            variant="h6"
                            noWrap
                            >
                            <Tooltip title={t("button.home")}><img src={iconlogo} alt="Icono logo"></img></Tooltip>
                        </Link>
                {usuarioEstaAutenticado && paginasInicioSesion.map((nombre) => (
                        <ListItemButton href={"/" + linkAsociado(nombre)}>
                            <Tooltip title={t(nombre)}>
                                <ListItemIcon>
                                    <Icono icono={t(nombre)}></Icono>
                                </ListItemIcon>
                            </Tooltip>
                            {width > 1200 && <ListItemText primary={t(nombre)} />}
                        </ListItemButton>
                ))}
                {nombrePagina.map((nombre) => (
                        <ListItemButton href={"/" + linkAsociado(nombre)}>
                            <Tooltip title={t(nombre)}>
                                <ListItemIcon>
                                    <Icono icono={t(nombre)}></Icono>
                                </ListItemIcon>
                            </Tooltip>
                                {width > 1200 && <ListItemText primary={t(nombre)} />}
                        </ListItemButton>
                    ))}
                {usuario !== undefined && <ListItemButton key="perfil" onClick={handleClickOpen}>
                    <ListItemIcon>
                    <Tooltip title={t("navBar.acount")}>
                        <IconButton key = "person" sx={{ p: 0 }}>
                            <Avatar sx={{ width: 30, height: 30 }} alt= {"Foto de perfil de " + usuario.nombre} src= {usuario.enlace_foto}></Avatar>
                        </IconButton>
                    </Tooltip> 
                    </ListItemIcon>
                    { width > 1200 && <ListItemText primary={t("navBar.acount")} />}
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>}
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {usuario !== undefined && <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }} href={"/profile/" + idUser}>
                            <Tooltip title={t("navBar.profile")}>
                                <ListItemIcon>
                                    <Icono icono={t("navBar.profile")}></Icono>
                                </ListItemIcon>
                            </Tooltip>
                            {width > 1200 && <ListItemText primary={t("navBar.profile")} />}
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }} href={"/stats/"}>
                            <Tooltip title={t("navBar.stats")}>
                                <ListItemIcon>
                                    <Icono icono={t("navBar.stats")}></Icono>
                                </ListItemIcon>
                            </Tooltip>
                            {width > 1200 && <ListItemText primary={t("navBar.stats")} />}
                            </ListItemButton>
                            <ListItemButton key="cerrarsesion" sx={{ pl: 4 }} onClick={handleCerrarSesion} id="cerrarSesion">
                            <Tooltip title={t("navBar.logout")}>
                                <ListItemIcon onClick={handleCerrarSesion}>
                                    <Icono icono={t("navBar.logout")}></Icono>
                                </ListItemIcon>
                            </Tooltip>
                            {width > 1200 && <ListItemText primary={t("navBar.logout")} />}
                            </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
                        <Tooltip title={t("navBar.delete")}>
                            <ListItemIcon onClick={handleClick}>
                                <Icono icono={t("navBar.delete")}></Icono>
                            </ListItemIcon>
                        </Tooltip>
                        {width > 1200 && <ListItemText primary={t("navBar.delete")} />}
                        </ListItemButton>
                </List>}
            </Collapse>
            <IconButton aria-label="delete" size="large" onClick={() => cambioIdioma("es")}>
                <Avatar alt= {"Selección idioma España"} src= {españa}></Avatar>
            </IconButton>
            <IconButton aria-label="delete" size="large">
                <Avatar alt= {"Selección idioma Inglaterra"} src= {inglaterra} onClick={() => cambioIdioma("en")}></Avatar>
            </IconButton>
            <Dialog
            open={dialog}
            onClose={handleClose}
        >
            <DialogTitle id="alert-dialog-title">
            {t("navBar.deleteTitle")}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {t("navBar.deleteSubtitle")}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>{t("button.cancel")}</Button>
            <Button onClick={handleEliminarMultimedia} autoFocus>
            {t("button.delete")}
            </Button>
            </DialogActions>
        </Dialog>
            </List>
        );
}
