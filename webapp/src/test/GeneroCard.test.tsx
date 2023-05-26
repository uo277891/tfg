import { render } from '@testing-library/react';
import GeneroCard from '../components/GeneroCard';

test('ArtistCard se renderiza correctamente', () => {
    const generos = ["FreeStyle", "FreeStyle", "Trap", "Pop"]
    const genero = "FreeStyle"
  const {getByText} = render(<GeneroCard genero = {genero} generos = {generos}/>);
  expect(getByText('Tu género favorito es')).toBeInTheDocument();
  expect(getByText('"FreeStyle",')).toBeInTheDocument();
  expect(getByText('el')).toBeInTheDocument();
  expect(getByText('50%')).toBeInTheDocument();
  expect(getByText('de tus seguidores escogen ese género como su favorito.')).toBeInTheDocument();
  expect(getByText('"Rap"')).toBeInTheDocument();
  expect(getByText('"Trap"')).toBeInTheDocument();
  expect(getByText('"Pop"')).toBeInTheDocument();
  expect(getByText('"Rock"')).toBeInTheDocument();
  expect(getByText('"Otro"')).toBeInTheDocument();
});
