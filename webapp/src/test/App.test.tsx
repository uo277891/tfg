import { render } from '@testing-library/react';
import App from '../App';

test('prueba codecov', () => {
  const {getByText} = render(<App />);
  expect(getByText("Red social de FreeStyle")).toBeInTheDocument();
});
