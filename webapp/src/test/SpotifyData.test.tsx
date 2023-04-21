import { render } from '@testing-library/react';
import SpotifyData from '../pages/SpotifyData';

test('No hay usuario autenticado', () => {
  const {getByText} = render(<SpotifyData/>);
  expect(getByText("Inicia sesión para consultar perfiles de spotify ajenos")).toBeInTheDocument();
});
