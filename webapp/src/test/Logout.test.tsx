import { render } from '@testing-library/react';
import Logout from '../pages/Logout';
import '../i18n'

test('Logout se renderiza correctamente', () => {
  const {getByText} = render(<Logout />);
  expect(getByText("Sesión finalizada")).toBeInTheDocument();
  expect(getByText("Gracias por usar nuestra red social. ¡Te esperamos de vuelta pronto!")).toBeInTheDocument();
  expect(getByText("Página de inicio")).toBeInTheDocument();
});
