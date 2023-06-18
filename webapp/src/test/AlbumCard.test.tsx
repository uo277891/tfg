import { render } from '@testing-library/react';
import AlbumCard from '../components/AlbumCard';
import '../i18n'

test('AlbumCard se renderiza correctamente', () => {
    const images: any[] = []
    images[0] = {url: ""}
    const external_url = {spotify: ""}
    const artista = [{name: "artista nombre"}]
    const album = {name: "nombre", images: images, release_date: "2023-01-01", total_tracks: "10", artists: artista, external_urls: external_url}
  const {getByText} = render(<AlbumCard album = {album}/>);
  expect(getByText("nombre")).toBeInTheDocument();
  expect(getByText("Fecha de lanzamiento:")).toBeInTheDocument();
  expect(getByText("01/01/2023")).toBeInTheDocument();
  expect(getByText("Número de canciones:")).toBeInTheDocument();
  expect(getByText("10")).toBeInTheDocument();
  expect(getByText("Artistas que participan:")).toBeInTheDocument();
  expect(getByText("artista nombre")).toBeInTheDocument();
  expect(getByText("Ver álbum en Spotify")).toBeInTheDocument();
});
