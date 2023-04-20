import { render } from '@testing-library/react';
import ArtistCard from '../components/ArtistCard';

test('ArtistCard se renderiza correctamente', () => {
    const images: any[] = []
    images[0] = {url: ""}
    const followers = {total: 10}
    const external_url = {spotify: ""}
    const genres = ["genero"]
    const artista = {name: "nombre", images: images, popularity: 70, genres: genres, followers: followers, external_urls: external_url}
  const {getByText} = render(<ArtistCard artista = {artista} artistaPropio = {false}/>);
  expect(getByText("nombre")).toBeInTheDocument();
  expect(getByText("Popularidad:")).toBeInTheDocument();
  expect(getByText("70")).toBeInTheDocument();
  expect(getByText("Seguidores:")).toBeInTheDocument();
  expect(getByText("10")).toBeInTheDocument();
  expect(getByText("Géneros:")).toBeInTheDocument();
  expect(getByText("genero")).toBeInTheDocument();
  expect(getByText("Ver perfil en Spotify")).toBeInTheDocument();
});
