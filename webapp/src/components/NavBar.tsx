import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from "@mui/material/Link";
import iconlogo from "../images/iconLogoBlanco.png";
import { useLocalStorage } from "../localStorage/useLocalStorage";
import { useState, useCallback, useEffect } from "react";
import { getUsuario } from "../accesoApi/apiUsuarios";
import { Usuario } from "../interfaces/interfaces";
import Avatar from '@mui/material/Avatar';

const nombrePagina = ['Sobre SocialFS'];
const linkPagina = ['aboutSocialfs']

const paginasInicioSesion = ['Siguiendo', 'Buscar usuarios','Crear publicación'];
const linkPaginaInicioSesion = ['follow', 'find', 'publication/new']

const settings = ['Perfil'];
const linkSettings = ['profile']

var hashmap = new Map();

function agregarPaginas(){
  for(let i = 0; i < nombrePagina.length; i++){
    hashmap.set(nombrePagina[i], linkPagina[i]);
  }

  for(let i = 0; i < paginasInicioSesion.length; i++){
    hashmap.set(paginasInicioSesion[i], linkPaginaInicioSesion[i]);
  }

  for(let i = 0; i < settings.length; i++){
    hashmap.set(settings[i], linkSettings[i]);
  }
}
agregarPaginas();

function linkAsociado (pagina:string){
  return hashmap.get(pagina)
}

function ResponsiveAppBar() {

  const [usuarioAutenticado, setUsuarioAutenticado] = useLocalStorage('user', '')

  const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

  const [idUser, setIdUser] = useLocalStorage('idUser', '')

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const [usuario, setUsuario] = useState<Usuario>();

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

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCerrarSesion = () => {
    setAnchorElUser(null);
    setUsuarioAutenticado("");
    setUsuarioEstaAcutenticado(false);
    setIdUser("")
  };

  return (
    <AppBar id = "navBar" position="static">
      <Container maxWidth={false}>
        <Toolbar disableGutters>
            <Link
                href="/"
                variant="h6"
                noWrap
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
                <img src={iconlogo} alt="Icono logo"></img>
            </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              key = "openMenu"
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {usuarioEstaAutenticado && paginasInicioSesion.map((nombre) => (
              <Link
                id={nombre}
                href={"/" + linkAsociado(nombre)}
                sx={{ my: 2, color: "#fff", display: "block", pr: 4, pl: 4 }}
              > {nombre}
              </Link>
          ))}
          {nombrePagina.map((nombre) => (
              <Link
                id={nombre}
                href={"/" + linkAsociado(nombre)}
                sx={{ my: 2, color: "#fff", display: "block", pr: 4, pl: 4 }}
              > {nombre}
              </Link>
            ))}
          </Box>

          {usuario !== undefined && <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Gestionar cuenta">
              <IconButton key = "person" onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src= {usuario.enlace_foto}></Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    id={setting}
                    href={"/" + linkAsociado(setting)}
                    sx={{ my: 2, color: "#000", display: "block", pr: 4, pl: 4 }}
                  > {setting}
                </Link>
                </MenuItem>
              ))}
              <MenuItem key="publicProfile" onClick={handleCloseUserMenu}>
                <Link
                  id="publicProfile"
                  href={"/profile/" + idUser}
                  sx={{ my: 2, color: "#000", display: "block", pr: 4, pl: 4 }}
                > Perfil público
                </Link>
              </MenuItem>
              <MenuItem key="cerrarSesion" onClick={handleCerrarSesion}>
                <Link
                  id="cerrarSesion"
                  href={"/logout"}
                  sx={{ my: 2, color: "#000", display: "block", pr: 4, pl: 4 }}
                > Cerrar Sesión
                </Link>
              </MenuItem>
            </Menu>
          </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;