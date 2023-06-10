import { render } from '@testing-library/react';
import Footer from '../components/Footer';

test('Footer se renderiza correctamente', () => {
  const {getByText} = render(<Footer />);
  expect(getByText("Hecho por Hugo Gutiérrez Tomás.")).toBeInTheDocument();
  expect(getByText("Correo de contacto: UO277891@uniovi.es")).toBeInTheDocument();
});
