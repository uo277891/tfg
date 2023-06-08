import Button from '@mui/material/Button';
import logo from '../images/logo.png';

/**
 * @returns Página para representar la despedida a un usuario
 */
const Logout = () => {

  return (
    <div className="estiloBase">
      <main>
        <h1>Sesión finalizada</h1>
        <p>Gracias por usar nuestra red social. ¡Te esperamos de vuelta pronto!</p>
            <Button href="/" className="boton" variant="contained">Página de inicio</Button>
      </main>
      <aside>
        <img src={logo} alt="logo"></img>
      </aside>
    </div>
  );
}

export default Logout;