import { render, fireEvent } from '@testing-library/react';
import NewPublication from '../pages/NewPublication';
import { BrowserRouter as Ruta} from "react-router-dom";

test('Renderiza NewPublication correctamente', () => {
  const {getByText} = render(<Ruta><NewPublication test={true}/></Ruta>);
  expect(getByText("Nueva publicación")).toBeInTheDocument();
  fireEvent.click(getByText('Crear publicación'));
  expect(getByText("Se debe escribir algo en el texto para crear la publicación.")).toBeInTheDocument();
});
