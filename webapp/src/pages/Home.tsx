import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import logo from '../images/logo.png';
import { useLocalStorage } from '../localStorage/useLocalStorage';
import HomeWithLogin from './HomeWithLogin';

const Home = () => {

  const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

  if(!usuarioEstaAutenticado)
    return (
      <div className="estiloBase">
        <main>
          <h1>Red social de FreeStyle</h1>
          <p>¡Bienvenido a <strong>SocialFS</strong>, la red social enfocada al mundo del freestyle!</p>
          <Stack spacing={4} direction="row">
            <Link href="/login" underline="none">
              <Button className="boton" variant="contained">Iniciar Sesión</Button>
            </Link>
            <Link href="/register" id = "registrarse" underline="none">
              <Button className="boton" id = "registrarse" variant="contained">Registrarse</Button>
            </Link>
          </Stack>
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