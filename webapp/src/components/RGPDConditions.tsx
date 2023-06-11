import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function RGPDConditions(props:any) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [acept, setAcept] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setRGPDCond(event.target.checked)
    setAcept(event.target.checked);
  };

  return (
    <div className="forms">
      <FormControlLabel control={<Checkbox id="condCheck" checked={acept} onChange={handleChange} />} label="Aceptar condiciones para tratamiento de datos"></FormControlLabel>
      <Button variant="contained" size="small" className="boton" id="condiciones" onClick={handleClickOpen}>
        Consultar condiciones
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="condiciones_rgpd"
        aria-describedby="condiciones-aplicar"
      >
        <DialogTitle id="condiciones_rgpd-title">
          {"Al registrarse usted acepta las siguientes condiciones"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="condiciones_rgpd-description">
            <ul>
                <li>
                    Sus datos personales podrán ser utilizados para la representación de estadísticas a otros usuarios (tales como el país de nacimiento, edad, etc.).
                </li>
                <li>
                    En caso de que desee eliminar su cuenta, sus datos personales serán eliminados de la base de datos (pueden quedar en alguna base de datos para copias de seguridad).
                </li>
                <li>
                    Sus datos personales estarán en la base de datos hasta el momento en que usted decida eliminarlos de la base de datos.
                </li>
                <li>
                    Sus datos personales no serán enviados a otras empresas.
                </li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}