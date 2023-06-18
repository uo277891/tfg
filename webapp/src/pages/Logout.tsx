import Button from '@mui/material/Button';
import logo from '../images/logo.png';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useLocalStorage } from '../localStorage/useLocalStorage';

/**
 * @returns Página para representar la despedida a un usuario
 */
const Logout = () => {

  const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

  const { i18n, t } = useTranslation()

  useEffect(() => {
      i18n.changeLanguage(idioma)
  }, [])

  return (
    <div className="estiloBase">
      <main>
        <h1>{t("logout.title")}</h1>
        <p>{t("logout.subTitle")}</p>
            <Button href="/" className="boton" variant="contained">{t("button.home")}</Button>
      </main>
      <aside>
        <img src={logo} alt="logo"></img>
      </aside>
    </div>
  );
}

export default Logout;