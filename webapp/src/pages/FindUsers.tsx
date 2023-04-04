import * as React from 'react';
import { useState, useCallback, useEffect } from "react";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Grid from "@mui/material/Grid";
import { getUsuariosByName } from "../accesoApi/api";
import { Usuario } from "../interfaces/interfaces";
import UserCard from "../components/UserCard";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Icono from '../util/iconosNavegacion';
import { common } from '@mui/material/colors';
import Prueba from '../components/FiltrosUsuario';

type Anchor = 'left';

const FindUsers = () => {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [texto, setTexto] = useState("");

    const [filtroPais, setFiltroPais] = useState("");

    const [filtroTipo, setFiltroTipo] = useState("");

    const [filtroEdad, setFiltroEdad] = React.useState<number[]>([0, 150]);

    const [cargando, setCargando] = useState<Boolean>(false);

    const [state, setState] = React.useState({left: false});

    const buscarUsuarios = async (text: string) => {
        setCargando(true)
        const users = await getUsuariosByName(text.toLowerCase())
        setUsuarios(users)
        setCargando(false)
    };

    async function HandleBuscaUsuarios () {
        if(texto.length > 0)
            await buscarUsuarios(texto);
    }

    async function handleFiltro (index: number) {
        console.log(filtroTipo)
        console.log(filtroEdad)
        console.log(filtroPais)
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
            {['Tipo artista', 'País', 'Rango edad'].map((text, index) => (
                <Box padding={'1em'}>
                    <Typography variant='h5' >{text}<br/>
                        <Prueba setFiltroEdad={setFiltroEdad} setFiltroPais={setFiltroPais} setFiltroTipo={setFiltroTipo} index={index}></Prueba>
                        <ListItem key={text} disablePadding>
                            <Button fullWidth sx={{color: common.black}} startIcon={<Icono icono={text}></Icono>} onClick={() => handleFiltro(index)}>
                                <ListItemText primary="Aplicar filtro" />
                            </Button>
                        </ListItem>
                    </Typography>
                    <Divider/>
                </Box>
            ))}
          </List>
        </Box>
      );

    if(!cargando){
        return (
        <div id="findUsers">
            <main>
                <Grid container spacing={5}>
                    <Grid item xs={11}>
                        <TextField fullWidth label="Buscar usuarios"  value={texto}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setTexto(event.target.value);
                        }}/>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton>
                            <SearchIcon onClick = {HandleBuscaUsuarios} id="questionIcon" fontSize="large"></SearchIcon>
                        </IconButton>
                    </Grid>
                </Grid>
                <div>
                    <React.Fragment key={'left'}>
                    <Button onClick={toggleDrawer('left', true)}>Filtros</Button>
                    <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                        {list()}
                    </Drawer>
                    </React.Fragment>
                </div>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Usuarios encontrados:
                    </Typography>
                    <List >
                        {usuarios.map((usuario: Usuario) =>
                            <UserCard usuario = {usuario}></UserCard>
                        )}
                    </List>
                </Grid>
            </main>
        </div>
        );
    }
    else{
        return <h1>Cargando...</h1>
    }
}

export default FindUsers;