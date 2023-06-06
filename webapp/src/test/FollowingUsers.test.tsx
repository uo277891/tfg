import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Ruta} from "react-router-dom";
import FollowingUsers from '../pages/FollowingUsers';

const setLocalStorage = (key: any, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

test('No hay usuario autentizado', () => {
  window.localStorage.clear();
  setLocalStorage("estaAutenticado", false)
  setLocalStorage("idUser", "1")
  const {getByText} = render(<Ruta><FollowingUsers/></Ruta>);
  expect(getByText("Inicia sesión para ver a quien sigues.")).toBeInTheDocument();
  window.localStorage.clear();
});
