import { render } from '@testing-library/react';
import AboutSocialFS from '../pages/AboutSocialFS';

test('AboutSocialFS se renderiza correctamente', () => {
  const {getByText} = render(<AboutSocialFS />);
  expect(getByText("Sobre Social FS")).toBeInTheDocument();
  expect(getByText("Motivación")).toBeInTheDocument();
  expect(getByText('SocialFS nace como un proyecto de fin de grado. Su finalidad principal es permitir que los "freestylers" puedan compartir fácilmente contenidos sobre sus proyectos y los promotores de eventos puedan compartir fechas y novedades de los mismos.')).toBeInTheDocument();
  expect(getByText("Conexión con Spotify")).toBeInTheDocument();
  expect(getByText("Con Spotify, los seguidores de los artistas podrán obtener más información con la utilización de la API proporcionada por Spotify.")).toBeInTheDocument();
  expect(getByText("Autor")).toBeInTheDocument();
  expect(getByText("El autor es Hugo Gutiérrez Tomás, realizado, como antes se ha dicho, como trabajo fin de grado en la carrera Ingeniería del Software en la Universidad de Oviedo.")).toBeInTheDocument();
  expect(getByText("Página de inicio")).toBeInTheDocument();
  expect(getByText("Iniciar Sesión")).toBeInTheDocument();
  expect(getByText("Registrarse")).toBeInTheDocument();
});
