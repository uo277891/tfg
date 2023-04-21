import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Ruta} from "react-router-dom";
import CardProfile from '../components/ProfileCard';

test('Renderiza ProfileCard correctamente', () => {
    const usuario = {enlace_foto: "", nombre: "nombre", pais: "España", localidad: "Gijon", fecha_nac: "2023-04-09T13:15:55.982+00:00", nombre_spotify: "spotify"}
  const {getByText} = render(<Ruta><CardProfile usuario={usuario}/></Ruta>);
  expect(getByText("nombre")).toBeInTheDocument();
  expect(getByText("Fecha de nacimiento: 09/04/2023")).toBeInTheDocument();
  expect(getByText('Nacionalidad: España')).toBeInTheDocument();
  expect(getByText("Localidad: Gijon")).toBeInTheDocument();
  expect(getByText("Perfil de Spotify: spotify")).toBeInTheDocument();
  expect(getByText("Editar")).toBeInTheDocument();
  fireEvent.click(getByText('Eliminar foto de perfil'));
  expect(getByText("Confirmar eliminación")).toBeInTheDocument();
  expect(getByText("¿Está seguro de eliminar su foto de perfil? Se le aplicará una foto de perfil determinada y podrá volver a elegir su foto editando su usuario")).toBeInTheDocument();
  expect(getByText("Cancelar")).toBeInTheDocument();
  expect(getByText("Confirmar")).toBeInTheDocument();
  fireEvent.click(getByText('Cancelar'));
});
