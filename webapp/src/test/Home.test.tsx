import { render } from '@testing-library/react';
import Home from '../pages/Home';

test('Home se renderiza correctamente', () => {
  const {getByText} = render(<Home />);
  expect(getByText("Red social de FreeStyle")).toBeInTheDocument();
  expect(getByText("¡Bienvenido a , la red social enfocada al mundo del freestyle!")).toBeInTheDocument();
  expect(getByText("SocialFS")).toBeInTheDocument();
  expect(getByText("Iniciar Sesión")).toBeInTheDocument();
  expect(getByText("Registrarse")).toBeInTheDocument();
});
