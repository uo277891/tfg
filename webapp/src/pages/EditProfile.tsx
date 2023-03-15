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
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import MenuItem from '@mui/material/MenuItem';
import  listaPaises  from '../util/listaPaises';
import TakeFile from '../components/TakeFile';
import { useLocalStorage } from "../localStorage/useLocalStorage";

const llamadaBase = "http://localhost:5000/usuario/"

const paises = listaPaises()

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="right" ref={ref} {...props} />;
  });

const EditProfile = () => {

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

    const [usuarioAutenticado, setUsuarioAutenticado] = useLocalStorage('user', '')

    var userNameInicio = usuarioAutenticado

    const[userName, setUserName] = React.useState("");

    const[country, setCountry] = React.useState("");

    const[location, setLocation] = React.useState("");

    const[nomSpoty, setNomSpoty] = React.useState("");

    const [registerError, setRegisterError] = React.useState(false);

    const [date, setDate] = React.useState<Dayjs | null>();

    const [register, setRegister] = React.useState(false);

    const [error, seterror] = React.useState("");

    const [registerCompleted, setRegisterCompleted] = React.useState("");

    const datosIniciales = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
          fetch(llamadaBase + "getusuario/" + userNameInicio, requestOptions)
            .then( async (response) => 
            {
              if(response.ok){
                var user = await response.json()
                console.log("Nombre de inicio: " + userNameInicio)
                setUserName(user.user.nombre)
                setNomSpoty(user.user.nombre_spotify)
                setCountry(user.user.pais)
                setLocation(user.user.localidad)
                setDate(user.user.fecha_nac)
              }
            })
    }

    const actualizarPerfil = () => {
        if(userName === "" || country === ""){
            setRegisterError(true);
            setRegister(false);
            seterror("El nombre y el país no pueden estar vacíos");
        }
        else{
          const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: userName, pais: country, localidad: location, fecha_nac: date, nombre_spotify: nomSpoty })
        };
          fetch(llamadaBase + "profile/edit/" + userNameInicio, requestOptions)
            .then((response) => 
            {
              response.json()
              if(response.ok){
                setRegisterError(false);
                setRegister(true);
                setUsuarioAutenticado(userName)
                userNameInicio = userName
                setRegisterCompleted("Perfil actualizado");
              }
              else{
                setRegisterError(true);
                setRegister(false);
                seterror("El nombre escogido ya está en uso");
              }
            })
        }
    }

  return (
    <div id="editProfile" className="forms">
      <main>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 3, width: '40ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <h1>Editar perfil</h1>
            <Button className="boton" variant="contained" onClick={datosIniciales}>Cargar datos iniciales</Button>
            <br/>
            <TextField required id="userName" label="Nombre de usuario" variant="outlined" onChange={(user) => setUserName(user.target.value)} value={userName}/>
            <br/>
            <TextField
              id="country"
              select
              label="País de nacimiento"
              defaultValue= {country}
              helperText="Selecciona tu país"
              onChange={(country) => setCountry(country.target.value)}
            >
              {paises.map((pais) => (
                <MenuItem key={pais} value={pais}>
                  {pais}
                </MenuItem>
              ))}
            </TextField>
            <TextField id="location" label="Localidad" variant="outlined" onChange={(location) => setLocation(location.target.value)} value={location}/>
            <br/>
            <TextField id="spotyName" label="Nombre de Spotify" variant="outlined" onChange={(spotyName) => setNomSpoty(spotyName.target.value)} value={nomSpoty}/>
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
            <TakeFile></TakeFile>
            <br/>
            <Button className="boton" variant="contained" onClick={actualizarPerfil}>Actualizar perfil</Button>
        </Box>
        <p>¿No quieres actualizar tu perfil?, vuelve atrás pulsando <Link href="/profile" >aquí</Link></p>
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

export default EditProfile;