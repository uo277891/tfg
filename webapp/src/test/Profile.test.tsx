import { render } from '@testing-library/react';
import Profile from '../pages/Profile';

test('No hay usuario autenticado', () => {
  const {getByText} = render(<Profile/>);
  expect(getByText("Perfil")).toBeInTheDocument();
  expect(getByText("No hay usuario autenticado.")).toBeInTheDocument();
});
