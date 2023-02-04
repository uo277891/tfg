import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import logo from '../images/logo.png';

const Home = () => {

  return (
    <div id="home">
      <main>
        <h1>Red social de FreeStyle.</h1>
        <p>¡Bienvenido a <strong>SocialFS</strong>, la red social enfocada al mundo del freestyle!</p>
        <Stack spacing={4} direction="row">
          <Link href="/inicioSesion" underline="none">
            <Button className="boton" variant="contained">Iniciar Sesión</Button>
          </Link>
          <Link href="/elegirRegistro" underline="none">
            <Button className="boton" variant="contained">Registrarse</Button>
          </Link>
        </Stack>
      </main>
      <aside>
        <img src={logo} alt="logo"></img>
      </aside>
    </div>
  );
}

export default Home;