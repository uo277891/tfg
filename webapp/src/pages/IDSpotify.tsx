import idSpotify from "../images/IDSpotify.jpg"
import Button from '@mui/material/Button';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

/**
 * @returns Página para representar cómo se puede obtener un ID de Spotify
 */
const IDSpotify = () => {

  const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

  const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

  const { i18n, t } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(idioma)
  }, [])

  return (
    <div className="idSpo">
        <main>
          <h1>{t("idSpo.title")}</h1>
          <ol>
            <li>{t("idSpo.step1")}</li>
            <li>{t("idSpo.step2")}</li>
            <aside>
              <img src={idSpotify} alt="Imagen que muestra un ID de Spotify"></img>
            </aside>
            <li>{t("idSpo.step3")}</li>
          </ol>
            {!usuarioEstaAutenticado && <Button href="/register" className="boton" variant="contained">{t("button.register")}</Button>}
        </main>
      </div>
  );
}

export default IDSpotify;