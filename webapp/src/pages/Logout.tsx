import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import logo from '../images/logo.png';

const Logout = () => {

  return (
    <div className="estiloBase">
      <main>
        <h1>Sesión finalizada</h1>
        <p>Gracias por usar nuestra red social. ¡Te esperamos de vuelta pronto!</p>
          <Link href="/" underline="none">
            <Button className="boton" variant="contained">Página de inicio</Button>
          </Link>
      </main>
      <aside>
        <img src={logo} alt="logo"></img>
      </aside>
    </div>
  );
}

export default Logout;