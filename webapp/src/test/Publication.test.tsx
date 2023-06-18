import { render } from '@testing-library/react';
import Publication from '../pages/Publication';
import '../i18n'

test('No hay usuario autenticado', () => {
    const {getByText} = render(<Publication/>);
  expect(getByText("Inicia sesión para acceder a esta página")).toBeInTheDocument();
});
