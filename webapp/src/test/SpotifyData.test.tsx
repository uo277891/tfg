import { render } from '@testing-library/react';
import SpotifyData from '../pages/SpotifyData';
import '../i18n'

test('No hay usuario autenticado', () => {
  const {getByText} = render(<SpotifyData/>);
  expect(getByText("Inicia sesión para acceder a esta página")).toBeInTheDocument();
});
