import { render } from '@testing-library/react';
import StatCard from '../components/StatCard';

test('StatCard se renderiza correctamente', () => {
  const {getByText} = render(<StatCard fem = "a" tipo = "Edad" est1 = "Joven" est2 = "Adulto" est3 = "Mayor" prob1 = "50" prob2 = "30" prob3 = "20" />);
  expect(getByText("Tu cuenta es mayoritariamente seguida por seguidores cuya Edad es")).toBeInTheDocument();
  expect(getByText('"Joven"')).toBeInTheDocument();
  expect(getByText('50%.')).toBeInTheDocument();
  expect(getByText('En el segundo escalón están los seguidores cuya Edad es')).toBeInTheDocument();
  expect(getByText('"Adulto"')).toBeInTheDocument();
  expect(getByText('30%.')).toBeInTheDocument();
  expect(getByText('Por último, hay una serie de seguidores cuya Edad es')).toBeInTheDocument();
  expect(getByText('"Mayor",')).toBeInTheDocument();
  expect(getByText('20%')).toBeInTheDocument();
  expect(getByText('del total.')).toBeInTheDocument();
});
