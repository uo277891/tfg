import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Ruta} from "react-router-dom";
import EditProfile from '../pages/EditProfile';

const setLocalStorage = (key: any, value: any) => {
    window.localStorage.setItem(key, JSON.stringify(value));
};

test('EditProfile renderiza correctamente', () => {
  setLocalStorage("estaAutenticado", true)
  setLocalStorage("idUser", "1")
  const {getByText} = render(<Ruta><EditProfile /></Ruta>);
  expect(getByText('Editar perfil')).toBeInTheDocument();
  expect(getByText('Recargar datos iniciales')).toBeInTheDocument();
  expect(screen.getByLabelText("Nombre de usuario *")).toBeInTheDocument();
  expect(screen.getByLabelText("País de nacimiento *")).toBeInTheDocument();
  expect(screen.getByLabelText("Localidad")).toBeInTheDocument();
  expect(screen.getByLabelText("Fecha de nacimiento")).toBeInTheDocument();
  expect(screen.getByLabelText("ID Spotify")).toBeInTheDocument();
  expect(screen.getByLabelText("Género favorito")).toBeInTheDocument();
  expect(getByText('¡Actualiza los enlaces a tus redes sociales!')).toBeInTheDocument();
  expect(getByText('¿No quieres actualizar tu perfil?, vuelve atrás pulsando')).toBeInTheDocument();
  expect(getByText('Actualizar perfil')).toBeInTheDocument();
  fireEvent.click(getByText('¡Actualiza los enlaces a tus redes sociales!'));
  expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
  expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
  expect(screen.getByLabelText("YouTube")).toBeInTheDocument();
  window.localStorage.clear();
});

test('No permite editar perfil sin estar autenticado', () => {
    const {getByText} = render(<Ruta><EditProfile /></Ruta>);
    expect(getByText('Inicia sesión para modificar tu perfil.')).toBeInTheDocument();
});
