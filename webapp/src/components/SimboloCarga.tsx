import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function SimboloCarga (props: any) {
    
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.open}
            onClick={props.close}
        >
            <CircularProgress color="inherit" />
      </Backdrop>
        );
}

export default SimboloCarga;