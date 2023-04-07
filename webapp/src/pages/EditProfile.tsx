import * as React from 'react';
import { ChangeEvent, useState, useCallback, useEffect } from "react";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Collapse from '@mui/material/Collapse';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import MenuItem from '@mui/material/MenuItem';
import  listaPaises  from '../util/listaPaises';
import { actualizaUsuario, pruebaArchivo } from '../accesoApi/api';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import { getUsuario } from "../accesoApi/api";
import { useNavigate } from "react-router-dom";
import { cumpleRegistro, errorUsuario } from '../util/condicionesRegistro';
import Textarea from '@mui/base/TextareaAutosize';
import { Typography } from '@mui/material';

const paises = listaPaises()

const EditProfile = () => {
      
    const handleDate = (newDate: Dayjs | null) => {
        setDate(newDate);
    };

    const [usuarioAutenticado, setUsuarioAutenticado] = useLocalStorage('user', '')

    const [idUser, setIdUser] = useLocalStorage('idUser', '')

    var userNameInicio = usuarioAutenticado

    const[userName, setUserName] = React.useState("");

    const[country, setCountry] = React.useState("");

    const[location, setLocation] = React.useState("");

    const[nomSpoty, setNomSpoty] = React.useState("");

    const [registerError, setRegisterError] = React.useState(false);

    const [date, setDate] = React.useState<Dayjs | null>();

    const[descripcion, setDescripcion] = React.useState("");

    const [error, seterror] = React.useState("");

    const redirigir = useNavigate();

    const datosIniciales = useCallback(async () => {
      const user = await getUsuario(idUser)
      if(user != undefined){
        setUserName(user[0].nombre)
        setNomSpoty(user[0].nombre_spotify)
        setCountry(user[0].pais)
        setLocation(user[0].localidad)
        setDate(user[0].fecha_nac)
        setDescripcion(user[0].descripcion)
      }
    }, []);
  
    useEffect(() => {
      datosIniciales();
    }, [])

  const [archivo, setArchivo] = useState<File>();

  const actualizaArchivo = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        if(e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png"){
          setArchivo(e.target.files[0]);
        }
        else{
            setRegisterError(true);
            seterror("La foto de perfil debe tener la extensión png o jpg.");
            setArchivo(undefined);
        }
    }
  };

  async function actualizarPerfil (){
    var url_foto = ""
    if(archivo !== undefined){
      let prueba = new FormData();
      prueba.append("myFile", archivo);
      const respuesta = await pruebaArchivo(idUser, archivo)
      console.log(respuesta)
      if(respuesta !== ""){
        url_foto = respuesta
      }else{
        setRegisterError(true);
        seterror("Foto no actualizada");
      }
      
    }

    const numError = cumpleRegistro(userName, "contraseñaQuePasa", "contraseñaQuePasa", country, location, date, descripcion)
      if(numError > -1){
        setRegisterError(true);
        seterror(errorUsuario(numError));
      }
    else {
      const actualizado = await actualizaUsuario(userNameInicio, userName, country, location, date, nomSpoty, descripcion, url_foto)
      if(actualizado){
        setUsuarioAutenticado(userName);
        redirigir("/profile/")
      }
      else{
        setRegisterError(true);
        seterror("El nombre escogido ya está en uso");
      }
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
            <Button className="boton" variant="contained" onClick={datosIniciales}>Recargar datos iniciales</Button>
            <br/>
            <TextField required id="userName" label="Nombre de usuario" variant="outlined" onChange={(user) => setUserName(user.target.value)} value={userName}/>
            <br/>
            <TextField
              id="country"
              select
              value={country}
              label="País de nacimiento *"
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
            <Typography>Descripción</Typography>
            <Textarea color="neutral" style={{ width: 600, fontSize:'1em' }} minRows={10} 
                id="texto" onChange={(text) => setDescripcion(text.target.value)} value={descripcion}/>
            <br/>
              {descripcion.length} / 200
            <br/>
            <br/>
            Sube tu foto de perfil: <input type="file" onChange={actualizaArchivo} />
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
    </div>
  );
}

export default EditProfile;