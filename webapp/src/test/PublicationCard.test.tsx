import { render, fireEvent } from '@testing-library/react';
import PublicationCard from '../components/PublicationCard';

test('PublicationCard se renderiza correctamente', () => {
    const likes = ["1", "2"]
    const publicacion = {tipo_multimedia: "", enlace_multimedia: "", texto: "textoPublicacion", fecha: "2023-04-09T13:15:55.982+00:00", likes: likes, _id: ""}
  const {getByText} = render(<PublicationCard publication = {publicacion} propiaPublicacion = {true}/>);
  expect(getByText("textoPublicacion")).toBeInTheDocument();
  expect(getByText("09/04/2023")).toBeInTheDocument();
  expect(getByText("2")).toBeInTheDocument();
  expect(getByText("Detalles")).toBeInTheDocument();
  expect(getByText("Eliminar")).toBeInTheDocument();
  fireEvent.click(getByText('Eliminar'));
  expect(getByText("Confirmar eliminación")).toBeInTheDocument();
  expect(getByText("La publicación, junto con sus me gusta y comentarios, será eliminada del sistema.")).toBeInTheDocument();
  expect(getByText("Cancelar")).toBeInTheDocument();
  expect(getByText("Confirmar")).toBeInTheDocument();
});
