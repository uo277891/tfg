import { render } from '@testing-library/react';
import SongCard from '../components/SongCard';
import '../i18n'

test('SongCard se renderiza correctamente', () => {
    const images: any[] = []
    images[0] = {url: ""}
    const external_url = {spotify: ""}
    const artista = [{name: "artistaNombre"}]
    const album = {album_type: "album", name: "nombreAlbum", images: images, release_date: "2023-01-01"}
    const cancion = {name: "nombreCancion", album: album, images: images, popularity: 80, duration_ms: 10000, artists: artista, external_urls: external_url, preview_url: ""}
  const {getByText} = render(<SongCard cancion = {cancion}/>);
  expect(getByText("nombreCancion")).toBeInTheDocument();
  expect(getByText("Álbum al que pertenece:")).toBeInTheDocument();
  expect(getByText("Fecha de lanzamiento:")).toBeInTheDocument();
  expect(getByText("Popularidad:")).toBeInTheDocument();
  expect(getByText("Duración:")).toBeInTheDocument();
  expect(getByText("Artistas que participan:")).toBeInTheDocument();
  expect(getByText("Extracto de la canción:")).toBeInTheDocument();
  expect(getByText("nombreAlbum")).toBeInTheDocument();
  expect(getByText("80")).toBeInTheDocument();
  expect(getByText("00:10")).toBeInTheDocument();
  expect(getByText("artistaNombre")).toBeInTheDocument();
  expect(getByText("01/01/2023")).toBeInTheDocument();
});
