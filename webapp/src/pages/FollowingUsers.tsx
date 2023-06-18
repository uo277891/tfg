import { useState, useCallback, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { getUsuariosByNameAndId, getUsuarios } from "../conector/apiUsuarios";
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
import { getFollowingUsers, getFollowsByUser } from "../conector/apiSeguidores";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from 'react-i18next';

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

    const { i18n, t } = useTranslation()

    const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

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
        i18n.changeLanguage(idioma)
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
            setUsuarios(await getUsuariosByNameAndId(users, texto.toLowerCase()))
            setCargando(false)
        }
    }

    if(cargando)
        return (<SimboloCarga open={cargando} close={!cargando}></SimboloCarga>)
    else if (usuarioEstaAutenticado){
        return (
        <div id="findUsers">
            <main>
                {!props.you && <h1>{t("find.follow")}</h1>}
                {props.you && <h1>{t("find.findUsers")}</h1>}
                <Grid container spacing={3}>
                    <Grid item xs={10.5}>
                        <TextField fullWidth label={t("find.searchUsersTextField")}  value={texto}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setTexto(event.target.value);
                        }}/>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title={t("button.find")}>
                            <IconButton onClick = {HandleBuscaUsuarios}>
                                <SearchIcon  id="questionIcon" fontSize="large"></SearchIcon>
                            </IconButton>
                        </Tooltip>
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
                        <Pagination color="secondary" count={Math.floor((usuarios.length / numElementos)) + 1} page={page} onChange={handleChange} />
                    </Stack>
                </Grid>
            </main>
        </div>
        );
    }
    else{
        return (<h1>{t("fallos.noIdent")}</h1>)
    }
}

export default FollowingUsers;