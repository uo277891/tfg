import { render } from '@testing-library/react';
import Estadisticas from '../pages/Estadisticas';

test('No hay usuario autenticado', () => {
  const {getByText} = render(<Estadisticas/>);
  expect(getByText("Inicia sesión para ver tus estadísticas")).toBeInTheDocument();
});
