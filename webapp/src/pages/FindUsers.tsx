import * as React from 'react';
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Grid from "@mui/material/Grid";
import { getUsuariosByFilters, getUsuariosByName } from "../conector/apiUsuarios";
import { Usuario } from "../interfaces/interfaces";
import UserCard from "../components/UserCard";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Icono from '../util/iconosNavegacion';
import { common } from '@mui/material/colors';
import Filtro from '../components/FiltrosUsuario';
import  Dayjs  from "dayjs";
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import SimboloCarga from '../components/SimboloCarga';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '../localStorage/useLocalStorage';

type Anchor = 'left';

/**
 * @returns Página para representar la búsqueda de usuarios
 */
const FindUsers = () => {

    const [page, setPage] = React.useState(1);

    const numElementos = 10

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [texto, setTexto] = useState("");

    const [filtroPais, setFiltroPais] = useState("nada");

    const [filtroTipo, setFiltroTipo] = useState("nada");

    const [filtroGenero, setFiltroGenero] = useState("nada");

    const [filtroEdad, setFiltroEdad] = React.useState<number[]>([16, 150]);

    const [cargando, setCargando] = useState<Boolean>(false);

    const [state, setState] = React.useState({left: false});

    const { i18n, t } = useTranslation()

    const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

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

    async function handleFiltro () {
            setCargando(true)
            const añoActual = Dayjs()
            const users = await getUsuariosByFilters(filtroTipo, filtroPais, añoActual.year() - filtroEdad[1], añoActual.year() - filtroEdad[0], filtroGenero)
            setUsuarios(users)
            setFiltroGenero("nada")
            setFiltroPais("nada")
            setFiltroTipo("nada")
            setCargando(false)
            toggleDrawer('left', false)
    }

    useEffect(() => {
        i18n.changeLanguage(idioma)
    }, []);
    
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
            {[t("find.artists"), t("find.country"), t("find.age"), t("find.genre")].map((text, index) => (
                <Box key = {"texto" + index} padding={'1em'}>
                    <Typography variant='h5' >{text}<br/>
                        <Filtro setFiltroGenero = {setFiltroGenero} setFiltroEdad={setFiltroEdad} setFiltroPais={setFiltroPais} setFiltroTipo={setFiltroTipo} index={index}></Filtro>
                    </Typography>
                </Box>
            ))}
            <Divider/>
            <Box key = "buttonFilter" padding={'1em'}>
                <Button id="btFiltros" fullWidth sx={{color: common.black}} startIcon={<Icono icono="Filtro"></Icono>} onClick={() => handleFiltro()}>
                    <ListItemText primary={t("button.apFilters")} />
                </Button>
            </Box>
          </List>
        </Box>
      );

    if(cargando)
      return (<SimboloCarga open={cargando} close={!cargando}></SimboloCarga>)

    else{
        return (
        <div id="findUsers">
            <main>
                <Grid container spacing={3}>
                    <Grid item xs={10.5}>
                        <TextField fullWidth label={t("find.searchUsersTextField")} id="searchName" value={texto}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setTexto(event.target.value);
                        }}/>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title={t("button.find")}>
                            <IconButton onClick = {HandleBuscaUsuarios} >
                                <SearchIcon  id="search" fontSize="large"></SearchIcon>
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                <div className='estiloBase'>
                    <React.Fragment key={'left'}>
                        <Button className="boton" id="buscar" variant="contained" onClick={toggleDrawer('left', true)}>{t("button.filters")}</Button>
                        <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                            {list()}
                        </Drawer>
                    </React.Fragment>
                </div>
                <Grid>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        {t("find.searchUsers")}
                    </Typography>
                    <List>
                        {usuarios.slice((page - 1) * numElementos, numElementos * page).map((usuario: Usuario) =>
                            <><UserCard key={usuario._id} usuario={usuario}></UserCard><Divider></Divider></>
                        )}
                    </List>
                </Grid>
                <Grid container alignItems="center" justifyContent="center">
                    <Stack spacing={2}>
                        <Pagination color="secondary" count={Math.floor((usuarios.length / numElementos)) + 1} page={page} onChange={handleChange} />
                    </Stack>
                </Grid>
            </main>
        </div>
        );
    }
}

export default FindUsers;