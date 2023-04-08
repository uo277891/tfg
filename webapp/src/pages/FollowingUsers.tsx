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

const FollowingUsers = () => {

    const [page, setPage] = React.useState(1);

    const numElementos = 10

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [idUser, setIdUser] = useLocalStorage('idUser', '')

    const [cargando, setCargando] = useState<Boolean>(true);

    const buscarUsuarios = useCallback(async () => {
        setCargando(true)
        const users = await getFollowingUsers(idUser)
        setUsuarios(await getUsuarios(users))
        setCargando(false) 
    }, []);
 
    useEffect(() => {
        buscarUsuarios();
    }, [])

    if(!cargando){
        return (
        <div id="findUsers">
            <main>
                <h1>Usuarios a los que sigues:</h1>
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
    else{
        return <h1>Cargando...</h1>
    }
}

export default FollowingUsers;