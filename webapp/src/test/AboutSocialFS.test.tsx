import { render } from '@testing-library/react';
import AboutSocialFS from '../pages/AboutSocialFS';
import '../i18n'

test('AboutSocialFS se renderiza correctamente', () => {
  const {getByText} = render(<AboutSocialFS />);
  expect(getByText("Sobre Social FS")).toBeInTheDocument();
  expect(getByText("Motivación")).toBeInTheDocument();
  expect(getByText('SocialFS nace como un proyecto de fin de grado. Su finalidad principal es permitir que los "freestylers" puedan compartir fácilmente contenidos sobre sus proyectos y los promotores de eventos puedan compartir fechas y novedades de los mismos. Pese a estar pensada para artistas del mundo del Freestyle, cualquier artista, principalmente del género musical, podrá usar este sistema, pues su conexión con Spotidy es válida para cualquier artista.')).toBeInTheDocument();
  expect(getByText("Conexión con Spotify")).toBeInTheDocument();
  expect(getByText("Autor")).toBeInTheDocument();
  expect(getByText("El autor de esta red social es Hugo Gutiérrez Tomás, realizado, como antes se ha dicho, como trabajo fin de grado en la carrera Ingeniería del Software en la Universidad de Oviedo. En caso de querer contactar con él, se propociona su correo electrónico corporativo de la Universidad de Oviedo en la parte inferior.")).toBeInTheDocument();
  expect(getByText("Página de inicio")).toBeInTheDocument();
  expect(getByText("Iniciar Sesión")).toBeInTheDocument();
  expect(getByText("Registrarse")).toBeInTheDocument();
});
