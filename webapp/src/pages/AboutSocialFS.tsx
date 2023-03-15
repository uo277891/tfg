import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const AboutSocialFS = () => {

  return (
    <div id="aboutFS">
      <main>
        <h1>Sobre Social FS</h1>
        <h2>Motivación</h2>
        <p>
            SocialFS nace como un proyecto de fin de grado. Su finalidad principal es permitir que los "freestylers" puedan compartir fácilmente contenidos 
            sobre sus proyectos y los promotores de eventos puedan compartir fechas y novedades de los mismos.
        </p>
        <h2>Conexión con Spotify</h2>
        <p>
           Con Spotify, los seguidores de los artistas podrán obtener más información con la utilización de la API proporcionada por Spotify.
        </p>
        <h2>Autor</h2>
        <p>
           El autor es Hugo Gutiérrez Tomás, realizado, como antes se ha dicho, como trabajo fin de grado en la carrera Ingeniería del Software en la Universidad de Oviedo.
        </p>
        <Stack spacing={4} direction="row">
          <Link href="/" underline="none">
            <Button className="boton" variant="contained">Página de inicio</Button>
          </Link>
          <Link href="/login" underline="none">
            <Button className="boton" variant="contained">Iniciar Sesión</Button>
          </Link>
          <Link href="/register" underline="none">
            <Button className="boton" variant="contained">Registrarse</Button>
          </Link>
        </Stack>
      </main>
    </div>
  );
}

export default AboutSocialFS;