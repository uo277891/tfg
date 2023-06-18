import { render, fireEvent } from '@testing-library/react';
import NewPublication from '../pages/NewPublication';
import { BrowserRouter as Ruta} from "react-router-dom";
import '../i18n'

const setLocalStorage = (key: any, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

test('Renderiza NewPublication correctamente', () => {
  setLocalStorage("estaAutenticado", true)
  setLocalStorage("idUser", "1")
  const {getByText} = render(<Ruta><NewPublication/></Ruta>);
  expect(getByText("Nueva publicación")).toBeInTheDocument();
  fireEvent.click(getByText('Crear publicación'));
  expect(getByText("Se debe escribir algo en el texto para crear la publicación.")).toBeInTheDocument();
  window.localStorage.clear();
});

test('No hay usuario autenticado', () => {
  setLocalStorage("estaAutenticado", false)
  const {getByText} = render(<Ruta><NewPublication/></Ruta>);
  expect(getByText("Inicia sesión para acceder a esta página")).toBeInTheDocument();
});
