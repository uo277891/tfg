import { render } from '@testing-library/react';
import Footer from '../components/Footer';

test('Footer se renderiza correctamente', () => {
  const {getByText} = render(<Footer />);
  expect(getByText("SocialFS, Hecho por Hugo Gutiérrez Tomás.")).toBeInTheDocument();
});