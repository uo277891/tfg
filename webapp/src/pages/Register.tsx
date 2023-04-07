import * as React from 'react';
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
import { getSignature, registro, actualizaFoto } from '../accesoApi/api';
import {cumpleRegistro, errorUsuario} from '../util/condicionesRegistro'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Textarea from '@mui/base/TextareaAutosize';
import { ChangeEvent } from 'react';
import RegisterCard from '../components/RegisterCard';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import { useNavigate } from "react-router-dom";

const paises = listaPaises()

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Register = () => {

  const tipoUsuario: string[] = ["Artista", "Promotor", "Estándar"]

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
      
    const handleDate = (newDate: Dayjs | null) => {
        setDate(newDate);
    };

    const redirigir = useNavigate();

    const [usuarioAutenticado, setUsuarioAutenticado] = useLocalStorage('user', '')

    const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)
    
    const [idUser, setIdUser] = useLocalStorage('idUser', '')

    const[userName, setUserName] = React.useState("");

    const[country, setCountry] = React.useState("");

    const[location, setLocation] = React.useState("");

    const[nomSpoty, setNomSpoty] = React.useState("");

    const [registerError, setRegisterError] = React.useState(false);

    const[password, setPassword] = React.useState("");

    const[passwordConf, setPasswordConf] = React.useState("");

    const [date, setDate] = React.useState<Dayjs | null>();

    const[tipoUsu, setTipoUsu] = React.useState("Artista");

    const[descripcion, setDescripcion] = React.useState("");

    const [archivo, setArchivo] = React.useState<File>();

    const [register, setRegister] = React.useState(false);

    const [error, seterror] = React.useState("");

    const actualizaArchivo = (e: ChangeEvent<HTMLInputElement>) => {
      if(e !== undefined)
          if (e.target.files) {
            if(e.target.files[0].type !== undefined){
                if(e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png"){
                    setArchivo(e.target.files[0]);
                }
                else{
                    setRegisterError(true);
                    setRegister(false);
                    seterror("La foto de perfil debe tener la extensión png o jpg.");
                    setArchivo(undefined);
                }
            }
            else
              setArchivo(undefined)
          }
        else
          setArchivo(undefined);
    };

    async function actualizarFoto() {
      if(archivo !== undefined){
        let data = new FormData();
        await getSignature(idUser)
        const cloudinaryURI = "https://api.cloudinary.com/v1_1/ddtcz5fqr/"
        data.append("file", archivo);
        data.append("api_key", "117284356463575");
        data.append('upload_preset', 'pt7pvrus');
        data.append("folder", "perfiles");
        data.append("public_id", idUser);
        const params = {
          method: 'POST',
          body: data
        };
        await fetch(cloudinaryURI + "upload", params)
          .then(async (response) => 
          {
            if(response.ok){
              const url = await response.json()
              const url_foto = url.secure_url
              const fotoAct = await actualizaFoto(usuarioAutenticado, url_foto)
              return fotoAct;
            }
          })
      }
      return true;
    }

    async function registrarse() {
      const numError = cumpleRegistro(userName, password, passwordConf, country, location, date, descripcion)
      if(numError > -1){
        setRegisterError(true);
        setRegister(false);
        seterror(errorUsuario(numError));
      }
      else{
        const usuarioRegistrado = await registro(userName.toLowerCase(), password, country, location, date, nomSpoty, "https://res.cloudinary.com/ddtcz5fqr/image/upload/v1679309731/perfiles/default_user_image_a8y5kc", descripcion, tipoUsu)
        if(usuarioRegistrado.creado){
          const user = await usuarioRegistrado.usuario
          setUsuarioAutenticado(userName)
          setUsuarioEstaAcutenticado(true)
          setIdUser(user._id)
          const foto = await actualizarFoto()
          if(foto){
            setRegisterError(false);
            setRegister(true);
            setUsuarioAutenticado(userName)
            setUsuarioEstaAcutenticado(true)
            setIdUser(user._id)
            redirigir("/profile/" + user._id)
          }
          else{
            setRegisterError(true);
            setRegister(false);
            seterror("Usuario creado, la foto no ha podido ser insertada");
          }
        }else{
          setRegisterError(true);
          setRegister(false);
          setUsuarioAutenticado("")
          setUsuarioEstaAcutenticado(false)
          setIdUser("")
          seterror("El nombre ya está en uso");
        }
      }
    }

  return (
    
    <div id="regiter" className="forms">
      <main>
      <h1>Registro</h1>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Información personal" {...a11yProps(0)} />
          <Tab label="Sobre ti" {...a11yProps(1)} />
          <Tab label="Resultado final" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
          <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 3, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <TextField required id="userName" label="Nombre de usuario" variant="outlined" onChange={(user) => setUserName(user.target.value)} value={userName}/>
                <br/>
                <TextField
                  id="country"
                  select
                  value={country}
                  label="País de nacimiento"
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
                <Button className="boton" variant="contained" onClick={() => setValue(1)}>Siguiente</Button>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
          <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 3, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <TextField
                  id="country"
                  select
                  value={tipoUsu}
                  label="Tipo de perfil"
                  onChange={(tipo) => setTipoUsu(tipo.target.value)}
                >
                  {tipoUsuario.map((pais) => (
                    <MenuItem key={pais} value={pais}>
                      {pais}
                    </MenuItem>
                  ))}
                </TextField>
                <br/>
                {tipoUsu !== "Estándar" && <TextField id="spotyName" label="Nombre de Spotify" variant="outlined" onChange={(spotyName) => setNomSpoty(spotyName.target.value)} value={nomSpoty}/>}
                <br/>
                <Textarea color="neutral" style={{ width: 600, fontSize:'1em' }} minRows={10} placeholder="Introduce una pequeña descripción sobre ti (máximo 200 caracteres)" 
                        id="texto" onChange={(text) => setDescripcion(text.target.value)} value={descripcion}/>
                <br/>
                {descripcion.length} / 200
                <br/>
                <Button className="boton" variant="contained" onClick={() => setValue(2)}>Siguiente</Button>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <RegisterCard 
            nombre={userName} pais={country} localidad={location} tipoUsu={tipoUsu} descripcion={descripcion} spotyName={nomSpoty}>
            </RegisterCard>
            <br/>
                Añade una foto de perfil (opcional): <input type="file" onChange={actualizaArchivo} />
            <br/>
            <Button className="boton" variant="contained" onClick={registrarse}>Registrarse</Button>
          </TabPanel>
          <p>¿Ya tienes cuenta?, ¡inicia sesión pulsando <Link href="/login" >aquí</Link>!</p>
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
        </Box>
      </main>
    </div>
  );
}

export default Register;