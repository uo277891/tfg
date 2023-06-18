import { render } from '@testing-library/react';
import UserCard from '../components/UserCard';
import '../i18n'

test('UserCard se renderiza correctamente', () => {
    const usuario = {_id: "", nombre: "nombre", enlace_foto: "", tipo: "artista", genero: "FreeStyle"}
  const {getByText} = render(<UserCard usuario = {usuario}/>);
  expect(getByText("nombre")).toBeInTheDocument();
  expect(getByText("Artista")).toBeInTheDocument();
  expect(getByText("- FreeStyle")).toBeInTheDocument();
});
