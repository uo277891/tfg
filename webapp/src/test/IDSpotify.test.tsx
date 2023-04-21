import { render } from '@testing-library/react';
import IDSpotify from '../pages/IDSpotify';

test('IDSpotify se renderiza correctamente', () => {
  const {getByText} = render(<IDSpotify />);
  expect(getByText("Cómo obtener tu ID de Spotify")).toBeInTheDocument();
  expect(getByText("Entra en tu perfil de spotify")).toBeInTheDocument();
  expect(getByText('Copia el código que aparece en la URL de la página')).toBeInTheDocument();
  expect(getByText("¡Listo, ya tienes tu ID de Spotify!")).toBeInTheDocument();
  expect(getByText("Registrarse")).toBeInTheDocument();
});
