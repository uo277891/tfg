import { render } from '@testing-library/react';
import ExternProfile from '../pages/ExternProfile';
import '../i18n'

test('No hay usuario autenticado', () => {
  const {getByText} = render(<ExternProfile/>);
  expect(getByText("Inicia sesión para acceder a esta página")).toBeInTheDocument();
});
