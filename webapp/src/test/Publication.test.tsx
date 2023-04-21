import { render } from '@testing-library/react';
import Publication from '../pages/Publication';

test('No hay usuario autenticado', () => {
    const {getByText} = render(<Publication/>);
  expect(getByText("Inicia sesión para poder ver perfiles ajenos.")).toBeInTheDocument();
});
