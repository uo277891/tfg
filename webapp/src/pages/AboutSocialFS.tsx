import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { useLocalStorage } from '../localStorage/useLocalStorage';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

/**
 * @returns Página para representar los datos asociados a SocialFS
 */
const AboutSocialFS = () => {

    const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

    const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

    const { i18n, t } = useTranslation()

    useEffect(() => {
        i18n.changeLanguage(idioma)
    }, [])
  
  return (
    <div id="aboutFS">
      <main>
        <h1>{t("about.title")}</h1>
        <h2>{t("about.subtitle1")}</h2>
        <p>
        {t("about.exp1")}
        </p>
        <h2>{t("about.subtitle2")}</h2>
        <p>
           {t("about.exp2part1")} <a href='/spotify/explanation/'>{t("about.here")}</a>. 
           {t("about.exp2part2")} <a href='/idspotify'>{t("about.here")}</a>.
        </p>
        <h2>{t("about.subtitle3")}</h2>
        <p>
        {t("about.exp3")}
        </p>
        
          <Button href="/" className="boton" variant="contained">{t("button.home")}</Button>
          {!usuarioEstaAutenticado && <Button href="/login" className="boton" variant="contained">{t("button.login")}</Button>}
          {!usuarioEstaAutenticado && <Button href="/register" className="boton" variant="contained">{t("button.register")}</Button>}
      </main>
    </div>
  );
}

export default AboutSocialFS;