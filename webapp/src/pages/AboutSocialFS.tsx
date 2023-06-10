import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useLocalStorage } from '../localStorage/useLocalStorage';

/**
 * @returns Página para representar los datos asociados a SocialFS
 */
const AboutSocialFS = () => {

  const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

  return (
    <div id="aboutFS">
      <main>
        <h1>Sobre Social FS</h1>
        <h2>Motivación</h2>
        <p>
            SocialFS nace como un proyecto de fin de grado. Su finalidad principal es permitir que los "freestylers" puedan compartir fácilmente contenidos 
            sobre sus proyectos y los promotores de eventos puedan compartir fechas y novedades de los mismos. Pese a estar pensada para artistas del mundo del Freestyle,
            cualquier artista, principalmente del género musical, podrá usar este sistema, pues su conexión con Spotidy es válida para cualquier artista.
        </p>
        <h2>Conexión con Spotify</h2>
        <p>
           Spotify proporciona datos sobre los artistas y promotores de la red social. Estos datos son representados por nuestro sistema de forma que los usuarios que los estén
           visualizando puedan acceder a ellos fácilmente. Además, se proporciona un enlace al dato que se está representado (artista, álbum, canción, etc.) de forma que sea 
           accesible de forma rápida. Si se quiere obtener más información sobre los datos que se visualizan se puede acceder <a href='/spotify/explanation/'>aquí</a>. 
           Si se desea saber cómo obtener un ID de Spotify, los pasos a seguir se pueden ver <a href='/idspotify'>aquí</a>.
        </p>
        <h2>Autor</h2>
        <p>
           El autor de esta red social es Hugo Gutiérrez Tomás, realizado, como antes se ha dicho, como trabajo fin de grado en la carrera Ingeniería del Software en la Universidad de Oviedo.
           En caso de querer contactar con él, se propociona su correo electrónico corporativo de la Universidad de Oviedo en la parte inferior.
        </p>
        
          <Button href="/" className="boton" variant="contained">Página de inicio</Button>
          {!usuarioEstaAutenticado && <Button href="/login" className="boton" variant="contained">Iniciar Sesión</Button>}
          {!usuarioEstaAutenticado && <Button href="/register" className="boton" variant="contained">Registrarse</Button>}
      </main>
    </div>
  );
}

export default AboutSocialFS;