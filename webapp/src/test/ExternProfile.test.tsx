import { render } from '@testing-library/react';
import ExternProfile from '../pages/ExternProfile';

test('No hay usuario autenticado', () => {
  const {getByText} = render(<ExternProfile/>);
  expect(getByText("Inicia sesión para poder ver perfiles ajenos.")).toBeInTheDocument();
});
