import { render } from '@testing-library/react';
import Profile from '../pages/Profile';
import '../i18n'

test('No hay usuario autenticado', () => {
  const {getByText} = render(<Profile/>);
  expect(getByText("Editar")).toBeInTheDocument();
  expect(getByText("Inicia sesión para acceder a esta página")).toBeInTheDocument();
});
