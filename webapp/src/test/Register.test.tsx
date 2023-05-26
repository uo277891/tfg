import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Ruta} from "react-router-dom";
import Register from '../pages/Register';

test('Renderiza primera página de Register correctamente', () => {
  const {getByText} = render(<Ruta><Register /></Ruta>);
  expect(getByText('Registro')).toBeInTheDocument();
  expect(getByText('Información personal')).toBeInTheDocument();
  expect(getByText('Sobre ti')).toBeInTheDocument();
  expect(getByText('Resultado final')).toBeInTheDocument();
  expect(getByText("¿Ya tienes cuenta?, ¡inicia sesión pulsando !")).toBeInTheDocument();
  expect(getByText("Consulta cómo obtener tu ID de Spotify")).toBeInTheDocument();
  expect(screen.getByLabelText("Nombre de usuario *")).toBeInTheDocument();
  expect(screen.getByLabelText("País de nacimiento")).toBeInTheDocument();
  expect(screen.getByLabelText("Localidad")).toBeInTheDocument();
  expect(screen.getByLabelText("Fecha de nacimiento")).toBeInTheDocument();
  expect(screen.getByLabelText("Contraseña *")).toBeInTheDocument();
  expect(screen.getByLabelText("Repetir Contraseña *")).toBeInTheDocument();
  fireEvent.click(getByText('Siguiente'));
  expect(screen.getByLabelText("Tipo de perfil")).toBeInTheDocument();
});

test('Renderiza segunda página de Register correctamente', () => {
    const {getByText} = render(<Ruta><Register /></Ruta>);
    fireEvent.click(getByText('Siguiente'));
    expect(getByText('¡Añade enlaces a tus redes sociales!')).toBeInTheDocument();
    expect(screen.getByLabelText("Género favorito")).toBeInTheDocument();
    expect(screen.getByLabelText("ID Spotify")).toBeInTheDocument();
    expect(getByText('0 / 200')).toBeInTheDocument();
    fireEvent.click(getByText('¡Añade enlaces a tus redes sociales!'));
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
    expect(screen.getByLabelText("Twitter")).toBeInTheDocument();
    expect(screen.getByLabelText("YouTube")).toBeInTheDocument();
    fireEvent.click(getByText('Siguiente'));
    expect(getByText('Añade una foto de perfil (opcional):')).toBeInTheDocument();
});

test('Renderiza tercera página de Register correctamente', () => {
    const {getByText} = render(<Ruta><Register /></Ruta>);
    fireEvent.click(getByText('Siguiente'));
    fireEvent.click(getByText('Siguiente'));
    expect(getByText('Añade una foto de perfil (opcional):')).toBeInTheDocument();
    fireEvent.click(getByText('Registrarse'));
    expect(getByText('Algún campo está vacío')).toBeInTheDocument();
});
