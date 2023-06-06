import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * Devuelve un componente que renderiza un símbolo de carga para cuando se produzcan llamadas a la base de datos
 * @param props true si se necesita carga o false en caso contrario
 * @returns Representación del símbolo de carga
 */
function SimboloCarga (props: any) {
    
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.open}
        >
            <CircularProgress color="inherit" />
      </Backdrop>
        );
}

export default SimboloCarga;