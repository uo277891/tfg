import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Ruta} from "react-router-dom";
import EditProfile from '../pages/EditProfile';
import '../i18n'

test('No permite editar perfil sin estar autenticado', () => {
    const {getByText} = render(<Ruta><EditProfile /></Ruta>);
    expect(getByText('Inicia sesión para acceder a esta página')).toBeInTheDocument();
});
