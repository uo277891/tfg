import { useState, useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { getFollowingUsers, getUsuarios } from "../accesoApi/api";
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
import { getUsuariosByNameAndId } from "../accesoApi/api";

const FollowingUsers = () => {

    const [page, setPage] = React.useState(1);

    const numElementos = 10

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [idUser, setIdUser] = useLocalStorage('idUser', '')

    const [cargando, setCargando] = useState<Boolean>(true);

    const [texto, setTexto] = useState("");

    const buscarUsuarios = useCallback(async () => {
        setCargando(true)
        const users = await getFollowingUsers(idUser)
        setUsuarios(await getUsuarios(users))
        setCargando(false) 
    }, []);
 
    useEffect(() => {
        buscarUsuarios();
    }, [])

    async function HandleBuscaUsuarios () {
        if(texto.length === 0){
            setCargando(true)
            const users = await getFollowingUsers(idUser)
            setUsuarios(await getUsuarios(users))
            setCargando(false)
        }
        else{
            setCargando(true)
            const users = await getFollowingUsers(idUser)
            setUsuarios(await getUsuariosByNameAndId(users, texto))
            setCargando(false)
        }
    }

    if(cargando)
        return (<SimboloCarga open={cargando} close={!cargando}></SimboloCarga>)
    else{
        return (
        <div id="findUsers">
            <main>
                <h1>Usuarios a los que sigues:</h1>
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
                <Grid>
                    <List >
                        {usuarios.slice((page - 1) * numElementos, numElementos * page).map((usuario: Usuario) =>
                            <UserCard key = {usuario._id} usuario = {usuario}></UserCard>
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

export default FollowingUsers;