import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Ruta} from "react-router-dom";
import FindUsers from '../pages/FindUsers';

test('Renderiza FindUsers correctamente', () => {
  const {getByText} = render(<Ruta><FindUsers/></Ruta>);
  expect(getByText("Filtros")).toBeInTheDocument();
  expect(screen.getByLabelText("Buscar usuarios")).toBeInTheDocument();
  expect(getByText("Usuarios encontrados:")).toBeInTheDocument();
  expect(getByText("1")).toBeInTheDocument();
  fireEvent.click(getByText('Filtros'));
});
