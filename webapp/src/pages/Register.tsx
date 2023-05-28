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
import { registro, actualizaFoto, reCaptchaGoogle } from '../accesoApi/apiUsuarios';
import { uploadMultimedia } from '../accesoApi/apiCloudinary';
import {cumpleRegistro, errorUsuario} from '../util/condicionesRegistro'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Textarea from '@mui/base/TextareaAutosize';
import { ChangeEvent } from 'react';
import RegisterCard from '../components/RegisterCard';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Grid, InputAdornment } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import SimboloCarga from '../components/SimboloCarga';
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from 'react';

const fechaInicio = require('dayjs');

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

  const generos: string[] = ["FreeStyle", "Rap", "Trap", "Pop", "Rock", "Otro"]

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

    const [cargando, setCargando] = React.useState(false);
    
    const [idUser, setIdUser] = useLocalStorage('idUser', '');

    const[userName, setUserName] = React.useState("");

    const[country, setCountry] = React.useState("España");

    const[location, setLocation] = React.useState("");

    const[nomSpoty, setNomSpoty] = React.useState("");

    const [registerError, setRegisterError] = React.useState(false);

    const[password, setPassword] = React.useState("");

    const[passwordConf, setPasswordConf] = React.useState("");

    const [date, setDate] = React.useState<Dayjs | null>(fechaInicio(1900));

    const[tipoUsu, setTipoUsu] = React.useState("Artista");

    const[generoFav, setGeneroFav] = React.useState("FreeStyle");

    const[redesSociales, setRedesSociales] = React.useState<string[]>(["", "", ""]);

    const[descripcion, setDescripcion] = React.useState("");

    const [archivo, setArchivo] = React.useState<File>();

    const [error, seterror] = React.useState("");

    const captchaRef = useRef<any>()

    function handleRedesSociales(indice: number, valorAct: string) {
      const redesAct = redesSociales.map((valor, i) => {
        if (i === indice) return valorAct;
        else return valor;
      });
      setRedesSociales(redesAct);
    }

    const actualizaArchivo = (e: ChangeEvent<HTMLInputElement>) => {
      if(e !== undefined)
          if (e.target.files) {
            if(e.target.files[0].type !== undefined){
                if(e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png"){
                    setArchivo(e.target.files[0]);
                }
                else{
                    setRegisterError(true);
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

    async function actualizarFoto(userName: string, userId: string) {
      if(archivo !== undefined){
        const respuesta = await uploadMultimedia(userId, archivo, true, false)
        if(respuesta !== ""){
          const url_foto = respuesta
          const fotoAct = await actualizaFoto(userName, url_foto)
          return fotoAct
        }else{
          return false;
        }
      }
      return true;
    }

    async function registrarse() {
      setCargando(true)
      const numError = cumpleRegistro(userName, password, passwordConf, country, location, date, descripcion)
      if(numError > -1){
        setRegisterError(true);
        seterror(errorUsuario(numError));
        setCargando(false)
      }
      else{
        const token = captchaRef.current.getValue();
        const noEsRobot = await reCaptchaGoogle(token)
        if(noEsRobot){
          const usuarioRegistrado = await registro(userName.toLowerCase(), password, country, location, date, nomSpoty, 
          process.env.REACT_APP_CLOUDINARY_DEFAULT_FOTO + "", descripcion, tipoUsu, generoFav, redesSociales)
          if(usuarioRegistrado.creado){
            const user = await usuarioRegistrado.usuario
            setUsuarioAutenticado(userName.toLowerCase())
            setUsuarioEstaAcutenticado(true)
            setIdUser(user._id)
            const foto = await actualizarFoto(userName.toLowerCase(), user._id)
            if(foto){
              setRegisterError(false);
              setUsuarioAutenticado(userName.toLowerCase())
              setUsuarioEstaAcutenticado(true)
              setIdUser(user._id)
              setCargando(false)
              redirigir("/profile/" + user._id)
            }
            else{
              setRegisterError(true);
              seterror("Usuario creado, la foto no ha podido ser insertada");
              setCargando(false)
            }
          }else{
            setRegisterError(true);
            setUsuarioAutenticado("")
            setUsuarioEstaAcutenticado(false)
            setIdUser("")
            seterror("El nombre ya está en uso");
            setCargando(false)
          }
        }
        else{
          setRegisterError(true);
          seterror("Confirme que no es un robot por favor 🤖");
          setCargando(false)
        }
      }
    }

  if(cargando)
    return (<SimboloCarga open={cargando} close={!cargando}></SimboloCarga>)
  else {
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
                  <form name="Register">
                    <TextField required id="userName" name = "userName" label="Nombre de usuario" variant="outlined" onChange={(user) => setUserName(user.target.value)} value={userName}/>
                    <br/>
                    <TextField
                      id="country"
                      select
                      value={country}
                      name='country'
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
                    <TextField id="location" name = "location" label="Localidad" variant="outlined" onChange={(location) => setLocation(location.target.value)} value={location}/>
                    <br/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                        label="Fecha de nacimiento"
                        inputFormat="DD/MM/YYYY"
                        value={date}
                        onChange={handleDate}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <br/>
                    <TextField required name = "passwd" id="password" label="Contraseña" type="password" variant="outlined" onChange={(pw) => setPassword(pw.target.value)} value={password}/>
                    <TextField required name = "repPasswd" id="passwordConf" label="Repetir Contraseña" type="password" variant="outlined" onChange={(pw) => setPasswordConf(pw.target.value)} value={passwordConf}/>
                    <br/>
                    <Button className="boton" id = "siguiente1" variant="contained" onClick={() => setValue(1)}>Siguiente</Button>
                  </form>
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
                  <TextField id="tipoUsuario" select value={tipoUsu} label="Tipo de perfil" onChange={(tipo) => setTipoUsu(tipo.target.value)}>
                    {tipoUsuario.map((tipo) => (
                      <MenuItem key={tipo} value={tipo}>
                        {tipo}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField id="generoFav" select value={generoFav} label="Género favorito" onChange={(genero) => setGeneroFav(genero.target.value)}>
                    {generos.map((genero) => (
                      <MenuItem key={genero} value={genero}>
                        {genero}
                      </MenuItem>
                    ))}
                  </TextField>
                  <br/>
                  {tipoUsu !== "Estándar" && <TextField id="spotyName" label="ID Spotify" variant="outlined" onChange={(spotyName) => setNomSpoty(spotyName.target.value)} value={nomSpoty}/>}
                  <br/>
                  <Grid container alignItems="center" justifyContent="center">
                    <Accordion sx={{width: '50%'}}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>¡Añade enlaces a tus redes sociales!</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <TextField InputProps={{startAdornment: (<InputAdornment position="start"><InstagramIcon /></InputAdornment>),}} 
                        id="Instrgram" label="Instagram" variant="outlined" value={redesSociales[0]} onChange={(ins) => {handleRedesSociales(0, ins.target.value)}}/>
                        <TextField InputProps={{startAdornment: (<InputAdornment position="start"><TwitterIcon /></InputAdornment>),}}
                        id="Twitter" label="Twitter" variant="outlined" value={redesSociales[1]} onChange={(tw) => handleRedesSociales(1, tw.target.value)}/>
                        <TextField InputProps={{startAdornment: (<InputAdornment position="start"><YouTubeIcon /></InputAdornment>),}}
                        id="YouTube" label="YouTube" variant="outlined" value={redesSociales[2]} onChange={(yt) => handleRedesSociales(2, yt.target.value)}/>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  <br/>
                  <Textarea color="neutral" style={{ width: 600, fontSize:'1em' }} minRows={10} placeholder="Introduce una pequeña descripción sobre ti (máximo 200 caracteres)" 
                          id="texto" onChange={(text) => setDescripcion(text.target.value)} value={descripcion}/>
                  <br/>
                  {descripcion.length} / 200
                  <br/>
                  <Button className="boton" id = "siguiente2" variant="contained" onClick={() => setValue(2)}>Siguiente</Button>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <RegisterCard 
              nombre={userName} pais={country} localidad={location} tipoUsu={tipoUsu} descripcion={descripcion} spotyName={nomSpoty}>
              </RegisterCard>
              <br/>
                  Añade una foto de perfil (opcional): <input type="file" onChange={actualizaArchivo} />
              <br/>
              <Grid container justifyContent="center" p={2}>
                <ReCAPTCHA ref={captchaRef} sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY + ""}/>
              </Grid>
              <Button className="boton" id="registrarse" variant="contained" onClick={registrarse}>Registrarse</Button>
            </TabPanel>
            <p>¿Ya tienes cuenta?, ¡inicia sesión pulsando <Link href="/login" >aquí</Link>!</p>
            <p>Consulta cómo obtener tu ID de Spotify <Link href="/idspotify" >aquí</Link></p>
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
}

export default Register;