import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Collapse from '@mui/material/Collapse';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import DateRegister from '../components/dateRegister';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const llamadaBase = "http://localhost:5000/usuario/"

const dateRegister = DateRegister

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="right" ref={ref} {...props} />;
  });

const Register = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
      
    const handleDate = (newDate: Dayjs | null) => {
        setDate(newDate);
    };

    const[userName, setUserName] = React.useState("");

    const[country, setCountry] = React.useState("");

    const[location, setLocation] = React.useState("");

    const[nomSpoty, setNomSpoty] = React.useState("");

    const [registerError, setRegisterError] = React.useState(false);

    const[password, setPassword] = React.useState("");

    const[passwordConf, setPasswordConf] = React.useState("");

    const [date, setDate] = React.useState<Dayjs | null>();

    const [register, setRegister] = React.useState(false);

    const [error, seterror] = React.useState("");

    const [registerCompleted, setRegisterCompleted] = React.useState("");

    const regsitro = () => {
        console.log("Entro regitro")
        if(userName === "" || password === "" || passwordConf === "" || country === ""){
            setRegisterError(true);
            setRegister(false);
            seterror("Algún campo está vacío");
        }
        else if(!(password === passwordConf)) {
            setRegisterError(true);
            setRegister(false);
            seterror("Las contraseñas no coiciden");
        }
        else if(password.length < 8) {
            setRegisterError(true);
            setRegister(false);
            seterror("La contraseña debe tener un mínimo de 8 caracteres");
        }
        else{
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: userName, contraseña: password, pais: country, localidad: location, fecha_nac: date, nombre_spotify: nomSpoty })
        };
          fetch(llamadaBase + "register", requestOptions)
            .then((response) => 
            {
              response.json()
              if(response.ok){
                setRegisterError(false);
                setRegister(true);
                setRegisterCompleted("Registro completado");
              }
              else{
                setRegisterError(true);
                setRegister(false);
                seterror("El nombre ya está seleccionado");
                setUserName("");
                setPasswordConf("");
                setCountry("");
                setNomSpoty("");
                setLocation("");
              }
            })
        }
    }

  return (
    <div id="regiter" className="forms">
      <main>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 3, width: '40ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <h1>Registro</h1>
            <TextField required id="userName" label="Nombre de usuario" variant="outlined" onChange={(user) => setUserName(user.target.value)} value={userName}/>
            <br/>
            <TextField required id="country" label="Pais" variant="outlined" onChange={(pw) => setCountry(pw.target.value)} value={country}/>
            <TextField id="location" label="Localidad" variant="outlined" onChange={(pw) => setLocation(pw.target.value)} value={location}/>
            <br/>
            <TextField id="spotyName" label="Nombre de Spotify" variant="outlined" onChange={(pw) => setNomSpoty(pw.target.value)} value={nomSpoty}/>
            <IconButton onClick={handleClickOpen} sx={{ margin: 2.75 }}>
                <QuestionMarkIcon id="questionIcon" fontSize="large"></QuestionMarkIcon>
            </IconButton>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Servicio Spotify"}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    El nombre de usuario servirá para que tus seguidores puedan recibir
                    información adicional proporcionada por Spotify.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
            <br/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                label="Fecha de nacimiento"
                inputFormat="MM/DD/YYYY"
                value={date}
                onChange={handleDate}
                renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <br/>
            <TextField required id="password" label="Contraseña" type="password" variant="outlined" onChange={(pw) => setPassword(pw.target.value)} value={password}/>
            <TextField required id="passwordConf" label="Repetir Contraseña" type="password" variant="outlined" onChange={(pw) => setPasswordConf(pw.target.value)} value={passwordConf}/>
            <br/>
            <Button className="boton" variant="contained" onClick={regsitro}>Registrarse</Button>
        </Box>
        <p>¿Ya tienes cuenta?, ¡inicia sesión pulsando <Link href="/login" >aquí</Link>!</p>
      </main>
      <Box sx={{ width: '100%' }}>
      <Collapse in={registerError}>
        <Alert
            severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setRegisterError(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      </Collapse>
      </Box>

      <Box sx={{ width: '100%' }}>
      <Collapse in={register}>
        <Alert
            severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setRegister(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {registerCompleted}
        </Alert>
      </Collapse>
      </Box>
    </div>
  );
}

export default Register;