import Button from '@mui/material/Button';
import logo from '../images/logo.png';
import { useLocalStorage } from '../localStorage/useLocalStorage';
import HomeWithLogin from './HomeWithLogin';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

/**
 * @returns Página para representar el inicio de un usuario sin identificar
 */
const Home = () => {

  const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

  const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

  const { i18n, t } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(idioma)
  }, [])

  if(!usuarioEstaAutenticado)
    return (
      <div className="estiloBase">
        <main>
          <h1>SocialFS.</h1>
          <p>{t('home.welcom1')}<strong>SocialFS</strong>{t('home.welcom2')}</p>
              <Button href="/login" className="boton" variant="contained">{t('button.login')}</Button>
              <Button href="/register" className="boton" id = "registrarse" variant="contained">{t('button.register')}</Button>
        </main>
          <aside>
            <img src={logo} alt="logo"></img>
          </aside>
      </div>
    );
    else
      return (<HomeWithLogin></HomeWithLogin>)
      
}

export default Home;