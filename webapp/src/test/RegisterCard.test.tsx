import { render } from '@testing-library/react';
import RegisterCard from '../components/RegisterCard';

test('RegisterCard se renderiza correctamente', () => {
  const {getByText} = render(<RegisterCard nombre = "nombre" pais = "Esp" localidad = "Gijon" tipoUsu = "Artista" descripcion = "descripcion" spotyName = "spotify"/>);
  expect(getByText("Datos personales:")).toBeInTheDocument();
  expect(getByText("Nombre*:")).toBeInTheDocument();
  expect(getByText("Nacionalidad*:")).toBeInTheDocument();
  expect(getByText("Localidad:")).toBeInTheDocument();
  expect(getByText("Datos del perfil:")).toBeInTheDocument();
  expect(getByText("Tipo de usuario:")).toBeInTheDocument();
  expect(getByText("Descripcion:")).toBeInTheDocument();
  expect(getByText("Perfil de Spotify:")).toBeInTheDocument();
  expect(getByText("nombre")).toBeInTheDocument();
  expect(getByText("Esp")).toBeInTheDocument();
  expect(getByText("Gijon")).toBeInTheDocument();
  expect(getByText("Artista")).toBeInTheDocument();
  expect(getByText("descripcion")).toBeInTheDocument();
  expect(getByText("spotify")).toBeInTheDocument();
});
