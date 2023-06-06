import { render } from '@testing-library/react';
import ExplicacionSpotify from '../pages/ExplicacionSpotify';

test('ExplicacionSpotify se renderiza correctamente', () => {
  const {getByText} = render(<ExplicacionSpotify />);
  expect(getByText("Qué datos se extraen de Spotify")).toBeInTheDocument();
  expect(getByText("Una vez nos proporciones tu ID de Spotify, a través de la API se sacarán los siguientes datos:")).toBeInTheDocument();
  expect(getByText('Sobre ti')).toBeInTheDocument();
  expect(getByText("Imagen de perfil.")).toBeInTheDocument();
  expect(getByText("Géneros con los que se te relaciona.")).toBeInTheDocument();
  expect(getByText("Popularidad en Spotify.")).toBeInTheDocument();
  expect(getByText("Número de seguidores.")).toBeInTheDocument();
  expect(getByText("Enlace a tu perfil de Spotify.")).toBeInTheDocument();

  expect(getByText('Tus 6 álbumes más populares')).toBeInTheDocument();
  expect(getByText("Imagen del álbum.")).toBeInTheDocument();
  expect(getByText("Fecha de lanzamiento.")).toBeInTheDocument();
  expect(getByText("Número de canciones.")).toBeInTheDocument();
  expect(getByText("Artistas.")).toBeInTheDocument();
  expect(getByText("Enlace al álbum.")).toBeInTheDocument();

  expect(getByText('Tus 6 canciones más populares')).toBeInTheDocument();
  expect(getByText("Imagen del álbum o canción.")).toBeInTheDocument();
  expect(getByText("Álbum al que pertenece.")).toBeInTheDocument();
  expect(getByText("Fecha de salida.")).toBeInTheDocument();
  expect(getByText("Artistas que participan.")).toBeInTheDocument();
  expect(getByText("Popularidad en la plataforma.")).toBeInTheDocument();
  expect(getByText("Duración.")).toBeInTheDocument();
  expect(getByText("Extracto de la canción.")).toBeInTheDocument();
  expect(getByText("Enlace a la canción.")).toBeInTheDocument();

  expect(getByText("12 artistas similares a ti (según Spotify)")).toBeInTheDocument();
  expect(getByText("Mismos datos que se muestran para tu perfil.")).toBeInTheDocument();
});
