import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Ruta} from "react-router-dom";
import NavBarLeft from '../components/NavBarLeft';

test('NavBarLeft se renderiza correctamente', () => {
  const {getByText} = render(<Ruta><NavBarLeft test = {true}></NavBarLeft></Ruta>);
  expect(getByText('Siguiendo')).toBeInTheDocument();
  expect(getByText("Buscar usuarios")).toBeInTheDocument();
  expect(getByText("Crear publicación")).toBeInTheDocument();
  expect(getByText("Sobre SocialFS")).toBeInTheDocument();
  expect(getByText("Obtener ID Spotify")).toBeInTheDocument();
  expect(getByText("Datos de Spotify")).toBeInTheDocument();
});
