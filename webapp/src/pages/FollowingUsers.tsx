import { useState, useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { getUsuariosByNameAndId, getUsuarios } from "../accesoApi/apiUsuarios";
import { Usuario } from "../interfaces/interfaces";
import UserCard from "../components/UserCard";
import List from '@mui/material/List';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import React from "react";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import SimboloCarga from "../components/SimboloCarga";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { getFollowingUsers, getFollowsByUser } from "../accesoApi/apiSeguidores";
import Divider from "@mui/material/Divider";

/**
 * @returns Página para representar los usuarios que sigue el usuario identificado
 */
const FollowingUsers = (props: any) => {

    const [page, setPage] = React.useState(1);

    const numElementos = 10

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

    const [idUser, setIdUser] = useLocalStorage('idUser', '')

    const [cargando, setCargando] = useState<Boolean>(false);

    const [texto, setTexto] = useState("");

    const buscarUsuarios = useCallback(async () => {
        if(usuarioEstaAutenticado){
            var users;
            setCargando(true)
            if(!props.you){
                users = await getFollowingUsers(idUser)
            }
            else{
                users = await getFollowsByUser(idUser)
            }
            if(users !== undefined)
                setUsuarios(await getUsuarios(users))
            setCargando(false)
        }
    }, []);
 
    useEffect(() => {
        buscarUsuarios();
    }, [])

    async function HandleBuscaUsuarios () {
        if(texto.length === 0){
            setCargando(true)
            var users;
            if(!props.you){
                users = await getFollowingUsers(idUser)
            }
            else{
                users = await getFollowsByUser(idUser)
            }
            setUsuarios(await getUsuarios(users))
            setCargando(false)
        }
        else{
            setCargando(true)
            var users;
            if(!props.you){
                users = await getFollowingUsers(idUser)
            }
            else{
                users = await getFollowsByUser(idUser)
            }
            setUsuarios(await getUsuariosByNameAndId(users, texto))
            setCargando(false)
        }
    }

    if(cargando)
        return (<SimboloCarga open={cargando} close={!cargando}></SimboloCarga>)
    else if (usuarioEstaAutenticado){
        return (
        <div id="findUsers">
            <main>
                <h1>Usuarios a los que sigues:</h1>
                <Grid container spacing={3}>
                    <Grid item xs={10.5}>
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
                <Grid>
                    <List>
                        {usuarios.slice((page - 1) * numElementos, numElementos * page).map((usuario: Usuario) =>
                            <><UserCard key={usuario._id} usuario={usuario}></UserCard><Divider></Divider></>
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
    else{
        return (<h1>Inicia sesión para ver a quien sigues.</h1>)
    }
}

export default FollowingUsers;