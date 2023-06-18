import CardProfile from '../components/ProfileCard';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import { useState, useCallback, useEffect } from "react";
import { getUsuario } from "../conector/apiUsuarios";
import { Usuario } from "../interfaces/interfaces";
import { useTranslation } from 'react-i18next';

/**
 * @returns Página para representar el perfil de un usuario
 */
const Profile = () => {

  const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)
  const [idUser, setIdUser] = useLocalStorage('idUser', '')

  const [usuario, setUsuario] = useState<Usuario>();

  const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

  const { i18n, t } = useTranslation()

  const datosIniciales = useCallback(async () => {
    const user = await getUsuario(idUser)
    if(user != undefined)
        setUsuario(user[0])
  }, []);

  useEffect(() => {
    i18n.changeLanguage(idioma)
    datosIniciales();
  }, [])

  if(usuarioEstaAutenticado && usuario !== undefined){
    return (
      <div id="profile">
        <main>
          <h1>{t("profile.title")}</h1>
          <CardProfile usuario = {usuario}></CardProfile>
        </main>
      </div>
    );
  }else{
    return(
      <div id="profile">
        <main>
          <h1>{t("profile.title")}</h1>
          <p>{t("fallos.noIdent")}</p>
        </main>
      </div>
    )
  }
}

export default Profile;