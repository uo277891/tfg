import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from "@mui/material/Link";
import PersonIcon from '@mui/icons-material/Person';
import iconlogo from "../images/iconLogoBlanco.png";

const nombrePagina = ['Sobre SocialFS','Siguiendo'];
const linkPagina = ['aboutSocialfs', 'follow']
const settings = ['Perfil', 'Cerrar Sesion'];

var hashmap = new Map();

function agregarPaginas(){
  for(let i = 0; i < nombrePagina.length; i++){
    hashmap.set(nombrePagina[i], linkPagina[i]);
  }
}
agregarPaginas();

function linkAsociado (pagina:string){
  console.log(hashmap.get(pagina))
  return hashmap.get(pagina)
}

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
          {nombrePagina.map((nombre) => (
              <Link
                id={nombre}
                href={"/" + linkAsociado(nombre)}
                sx={{ my: 2, color: "#fff", display: "block", pr: 4, pl: 4 }}
              > {nombre}
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <PersonIcon id="iconPerson" fontSize="large"></PersonIcon>
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;