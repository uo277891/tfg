import * as React from 'react';
import { useState } from "react";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Grid from "@mui/material/Grid";
import { getUsuarioByCountry, getUsuarioByFecha, getUsuarioByGenero, getUsuarioByTipoUsuario, getUsuariosByName } from "../accesoApi/api";
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
import Filtro from '../components/FiltrosUsuario';
import  Dayjs  from "dayjs";
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import SimboloCarga from '../components/SimboloCarga';

type Anchor = 'left';

const FindUsers = () => {

    const [page, setPage] = React.useState(1);

    const numElementos = 10

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [texto, setTexto] = useState("");

    const [filtroPais, setFiltroPais] = useState("");

    const [filtroTipo, setFiltroTipo] = useState("");

    const [filtroGenero, setFiltroGenero] = useState("");

    const [filtroEdad, setFiltroEdad] = React.useState<number[]>([16, 150]);

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
        if(index === 0 && filtroTipo !== ""){
            setCargando(true)
            const users = await getUsuarioByTipoUsuario(filtroTipo)
            setUsuarios(users)
            setCargando(false)
        }
        else if(index === 1 && filtroPais !== ""){
            setCargando(true)
            const users = await getUsuarioByCountry(filtroPais)
            setUsuarios(users)
            setCargando(false)
        }
        else if(index === 2){
            setCargando(true)
            const añoActual = Dayjs()
            const users = await getUsuarioByFecha(añoActual.year() - filtroEdad[0], añoActual.year() - filtroEdad[1])
            setUsuarios(users)
            setCargando(false)
        }else if(index === 3 && filtroGenero !== ""){
            setCargando(true)
            const users = await getUsuarioByGenero(filtroGenero)
            setUsuarios(users)
            setCargando(false)
        }
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
            {['Tipo artista', 'País', 'Rango edad', 'Género'].map((text, index) => (
                <Box key = "text" padding={'1em'}>
                    <Typography variant='h5' >{text}<br/>
                        <Filtro setFiltroGenero = {setFiltroGenero} setFiltroEdad={setFiltroEdad} setFiltroPais={setFiltroPais} setFiltroTipo={setFiltroTipo} index={index}></Filtro>
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

    if(cargando)
      return (<SimboloCarga open={cargando} close={!cargando}></SimboloCarga>)

    else{
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
                        <IconButton onClick = {HandleBuscaUsuarios}>
                            <SearchIcon  id="questionIcon" fontSize="large"></SearchIcon>
                        </IconButton>
                    </Grid>
                </Grid>
                <div className='estiloBase'>
                    <React.Fragment key={'left'}>
                        <Button className="boton" variant="contained" onClick={toggleDrawer('left', true)}>Filtros</Button>
                        <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                            {list()}
                        </Drawer>
                    </React.Fragment>
                </div>
                <Grid>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Usuarios encontrados:
                    </Typography>
                    <List>
                        {usuarios.slice((page - 1) * numElementos, numElementos * page).map((usuario: Usuario) =>
                            <UserCard usuario = {usuario}></UserCard>
                        )}
                    </List>
                </Grid>
                <Grid container alignItems="center" justifyContent="center">
                    <Stack spacing={2}>
                        <Pagination color="secondary" count={Math.round(usuarios.length / numElementos) + 1} page={page} onChange={handleChange} />
                    </Stack>
                </Grid>
            </main>
        </div>
        );
    }
}

export default FindUsers;