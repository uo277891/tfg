import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Ruta} from "react-router-dom";
import RGPDConditions from '../components/RGPDConditions';
import '../i18n'

test('RGPDConditions renderiza correctamente', () => {
  const {getByText} = render(<Ruta><RGPDConditions /></Ruta>);
  expect(screen.getByLabelText("Aceptar condiciones para tratamiento de datos")).toBeInTheDocument();
  fireEvent.click(getByText('Consultar condiciones'));
  expect(getByText('Al registrarse usted acepta las siguientes condiciones')).toBeInTheDocument();
  expect(getByText('Sus datos personales podrán ser utilizados para la representación de estadísticas a otros usuarios (tales como el país de nacimiento, edad, etc.).')).toBeInTheDocument();
  expect(getByText('En caso de que desee eliminar su cuenta, sus datos personales serán eliminados de la base de datos (pueden quedar en alguna base de datos para copias de seguridad).')).toBeInTheDocument();
  expect(getByText('Sus datos personales estarán en la base de datos hasta el momento en que usted decida eliminarlos de la base de datos.')).toBeInTheDocument();
  expect(getByText('Sus datos personales no serán enviados a otras empresas.')).toBeInTheDocument();
  expect(getByText('Cerrar')).toBeInTheDocument();
});