import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter as Ruta} from "react-router-dom";

test('No permite hacer login con datos vacíos', () => {
  const {getByText} = render(<Ruta><Login /></Ruta>);
  expect(getByText('Iniciar Sesión')).toBeInTheDocument();
  expect(getByText("Si no tienes cuenta, ¡crea una ahora pulsando !")).toBeInTheDocument();
  expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
  expect(screen.getByLabelText("Usuario")).toBeInTheDocument();
  fireEvent.click(getByText('Comprobar credenciales'));
  expect(getByText("Algún campo está vacío")).toBeInTheDocument();
});
