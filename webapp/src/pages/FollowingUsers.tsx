import { useState, useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { getFollowingUsers, getUsuarios } from "../accesoApi/api";
import { Usuario } from "../interfaces/interfaces";
import UserCard from "../components/UserCard";
import List from '@mui/material/List';
import { useLocalStorage } from "../localStorage/useLocalStorage";

const FollowingUsers = () => {

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
                <Grid item xs={12} md={6}>
                    <List >
                        {usuarios.map((usuario: Usuario) =>
                            <UserCard key = {usuario._id} usuario = {usuario}></UserCard>
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

export default FollowingUsers;