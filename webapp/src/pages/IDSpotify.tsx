import idSpotify from "../images/IDSpotify.jpg"
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

const IDSpotify = () => {

  return (
    <div className="idSpo">
        <main>
          <h1>Cómo obtener tu ID de Spotify</h1>
          <ol>
            <li>Entra en tu perfil de spotify</li>
            <li>Copia el código que aparece en la URL de la página</li>
            <aside>
              <img src={idSpotify} alt="Imágen que muestra un ID de Spotify"></img>
            </aside>
            <li>¡Listo, ya tienes tu ID de Spotify!</li>
          </ol>
          <Link href="/register" underline="none">
            <Button className="boton" variant="contained">Registrarse</Button>
          </Link>
        </main>
      </div>
  );
}

export default IDSpotify;