import CardProfile from '../components/ProfileCard';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import { useState, useCallback, useEffect } from "react";
import { getPublicaciones, getSeguidores, getUsuario, isSeguidor, dejarDeSeguir, seguir } from "../accesoApi/api";
import { Usuario } from "../interfaces/interfaces";

const Profile = () => {

  const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)
  const [idUser, setIdUser] = useLocalStorage('idUser', '')

  const [usuario, setUsuario] = useState<Usuario>();

  const datosIniciales = useCallback(async () => {
    console.log(idUser)
    const user = await getUsuario(idUser)
    console.log(user)
    if(user != undefined)
        setUsuario(user[0])
  }, []);

  useEffect(() => {
    datosIniciales();
  }, [])

  if(usuarioEstaAutenticado && usuario !== undefined){
    return (
      <div id="profile">
        <main>
          <h1>Perfil</h1>
          <CardProfile usuario = {usuario}></CardProfile>
        </main>
      </div>
    );
  }else{
    return(
      <div id="profile">
        <main>
          <h1>Perfil</h1>
          <p>No hay usuario autenticado.</p>
        </main>
      </div>
    )
  }
}

export default Profile;