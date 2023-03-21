import { useState, useCallback, useEffect } from "react";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Grid from "@mui/material/Grid";
import { getUsuariosByName } from "../accesoApi/api";
import { Usuario } from "../interfaces/interfaces";
import UserCard from "../components/UserCard";
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

const FindUsers = () => {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const [texto, setTexto] = useState("");

    const [cargando, setCargando] = useState<Boolean>(false);

    const buscarUsuarios = async (text: string) => {
        setCargando(true)
        const users = await getUsuariosByName(text.toLowerCase())
        setUsuarios(users)
        setCargando(false)
    };

    async function HandleBuscaUsuarios () {
        await buscarUsuarios(texto);
    }

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