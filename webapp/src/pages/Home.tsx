import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import logo from '../images/logo.png';
import { useLocalStorage } from '../localStorage/useLocalStorage';
import HomeWithLogin from './HomeWithLogin';

/**
 * @returns Página para representar el inicio de un usuario sin identificar
 */
const Home = () => {

  const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

  if(!usuarioEstaAutenticado)
    return (
      <div className="estiloBase">
        <main>
          <h1>SocialFS.</h1>
          <p>¡Bienvenido a <strong>SocialFS</strong>, la red social enfocada al mundo del freestyle!</p>
              <Button href="/login" className="boton" variant="contained">Iniciar Sesión</Button>
              <Button href="/register" className="boton" id = "registrarse" variant="contained">Registrarse</Button>
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