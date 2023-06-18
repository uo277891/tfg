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
import  listaPaisesIngles  from '../util/listaPaisesIngles';
import { registro, actualizaFoto, reCaptchaGoogle } from '../conector/apiUsuarios';
import { uploadMultimedia } from '../conector/apiCloudinary';
import {cumpleRegistro, errorUsuario} from '../util/condicionesRegistro'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Textarea from '@mui/base/TextareaAutosize';
import { ChangeEvent, useEffect } from 'react';
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
import RGPDConditions from '../components/RGPDConditions';
import { useTranslation } from 'react-i18next';

const fechaInicio = require('dayjs');

const paises = listaPaises()

const paisesIngles = listaPaisesIngles()

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

/**
 * @returns Página para representar el registro de un usuario
 */
const Register = () => {

  const tipoUsuario: string[] = ["Artista", "Promotor", "Estándar"]
  const tipoUsuarioIngles: string[] = ["Artist", "Promoter", "Standard"]

  const generos: string[] = ["FreeStyle", "Rap", "Trap", "Pop", "Rock", "Otro"]
  const generosIngles: string[] = ["FreeStyle", "Rap", "Trap", "Pop", "Rock", "Other"]

  const [value, setValue] = React.useState(0);

  const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

  const { i18n, t } = useTranslation()

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

    const [RGPDCond, setRGPDCond] = React.useState(false);
    
    const [idUser, setIdUser] = useLocalStorage('idUser', '');

    const[userName, setUserName] = React.useState("");

    const[country, setCountry] = React.useState("Argentina");

    const[location, setLocation] = React.useState("");

    const[nomSpoty, setNomSpoty] = React.useState("");

    const [registerError, setRegisterError] = React.useState(false);

    const[password, setPassword] = React.useState("");

    const[passwordConf, setPasswordConf] = React.useState("");

    const [date, setDate] = React.useState<Dayjs | null>(fechaInicio(1900));

    const[tipoUsu, setTipoUsu] = React.useState("");

    const[generoFav, setGeneroFav] = React.useState("FreeStyle");

    const[redesSociales, setRedesSociales] = React.useState<string[]>(["", "", ""]);

    const[descripcion, setDescripcion] = React.useState("");

    const [archivo, setArchivo] = React.useState<File>();

    const [error, seterror] = React.useState("");

    const[porcentajeAncho, setPorcentajeAncho] = React.useState("40%");

    const captchaRef = useRef<any>()

    function handleRedesSociales(indice: number, valorAct: string) {
      const redesAct = redesSociales.map((valor, i) => {
        if (i === indice) return valorAct;
        else return valor;
      });
      setRedesSociales(redesAct);
    }

    const handleResize = () => {
      if(window.innerWidth < 900){
        setPorcentajeAncho("90%")
      }else{
        setPorcentajeAncho("50%")
      }
    };

    useEffect(() => {
      i18n.changeLanguage(idioma)
      setCargando(true)
      window.addEventListener("resize", handleResize);
      setCargando(false)
  }, [])

    const actualizaArchivo = (e: ChangeEvent<HTMLInputElement>) => {
      if(e !== undefined)
          if (e.target.files) {
            if(e.target.files[0].type !== undefined){
                if(e.target.files[0].size > 1000000){
                  setRegisterError(true);
                  seterror(t("newPub.errorMulTam"));
                  setArchivo(undefined);
                } 
                else if(e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png"){
                    setArchivo(e.target.files[0]);
                }
                else{
                    setRegisterError(true);
                    seterror(t("register.errorMul"));
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
        if(archivo.size > 3000000){
          setRegisterError(true);
          seterror(t("newPub.errorMulTam"));
          setArchivo(undefined);
        }
        else if(archivo.type !== "image/jpeg" && archivo.type !== "image/png" && archivo.type !== "audio/mpeg"){
            setRegisterError(true);
            seterror(t("register.errorMul"));
            setArchivo(undefined);
        }
        else{
          const respuesta = await uploadMultimedia(userId, archivo, true, false)
          if(respuesta !== ""){
            const url_foto = respuesta
            const fotoAct = await actualizaFoto(userName, url_foto)
            return fotoAct
          }else{
            return false;
          }
        }
      }
      return true;
    }

    function siguiente (sig: number) {
      let errorTipo = false
      if(sig === 2){
        if(tipoUsu === ""){
          setRegisterError(true);
          seterror(t("register.errorTip"));
          setCargando(false)
          setValue(1)
          errorTipo = true
        }
      }
      const numError = cumpleRegistro(userName, password, passwordConf, country, location, date, descripcion, RGPDCond)
      if(numError > -1){
        setRegisterError(true);
        seterror(errorUsuario(numError, idioma));
        setCargando(false)
        if(numError === 4 || numError === 8) setValue(1)
        else setValue(0)
      }
      else if(!errorTipo)
        setValue(sig)
    }

    async function registrarse() {
      setCargando(true)
      const numError = cumpleRegistro(userName, password, passwordConf, country, location, date, descripcion, RGPDCond)
      if(tipoUsu === ""){
        setRegisterError(true);
        seterror(t("register.errorTip"));
        setCargando(false)
        setValue(1)
      }
      if(numError > -1){
        setRegisterError(true);
        seterror(errorUsuario(numError, idioma));
        setCargando(false)
        if(numError === 4 || numError === 8)
          setValue(1)
        else
          setValue(0)
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
              window.location.reload()
            }
            else{
              setRegisterError(true);
              seterror(t("register.errorNoMul"));
              setCargando(false)
            }
          }else{
            setRegisterError(true);
            setUsuarioAutenticado("")
            setUsuarioEstaAcutenticado(false)
            setIdUser("")
            seterror(t("register.errorName"));
            setCargando(false)
          }
        }
        else{
          setRegisterError(true);
          seterror(t("register.errorRobot"));
          setCargando(false)
          setValue(2)
        }
      }
    }

  if(cargando)
    return (<SimboloCarga open={cargando} close={!cargando}></SimboloCarga>)
  else {
    return (
      <div id="regiter" className="forms">
        <main>
        <h1>{t("register.title")}</h1>
        <Box sx={{ width: '100%' }}>
        <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
          <Tabs style={{ width: 'auto' }} value={value} onChange={handleChange}>
            <Tab label={t("register.tab1")} {...a11yProps(0)} />
            <Tab label={t("register.tab2")} {...a11yProps(1)} />
            <Tab label={t("register.tab3")} {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            <Box
                  component="form"
                  sx={{
                      '& .MuiTextField-root': { m: 3, width: porcentajeAncho },
                  }}
                  noValidate
                  autoComplete="off"
                  name='Register'
                  >
                    <TextField required id="userName" name = "userName" label={t("register.name")} variant="outlined" onChange={(user) => setUserName(user.target.value)} value={userName}/>
                    <br/>
                    <TextField
                      id="country"
                      select
                      value={country}
                      name='country'
                      label={t("register.country")}
                      helperText={t("register.countryLabel")}
                      onChange={(country) => setCountry(country.target.value)}
                    >
                      {idioma === "es" && paises.map((pais, index) => (
                        <MenuItem key={index} value={pais}>
                          {pais}
                        </MenuItem>
                      ))}
                      {idioma === "en" && paisesIngles.map((pais, index) => (
                        <MenuItem key={pais} value={paises[index]}>
                          {pais}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField id="location" name = "location" label={t("register.location")} variant="outlined" onChange={(location) => setLocation(location.target.value)} value={location}/>
                    <br/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                        label={t("register.date")}
                        inputFormat="DD/MM/YYYY"
                        value={date}
                        onChange={handleDate}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <br/>
                    <TextField required name = "passwd" id="password" label={t("register.password")} type="password" variant="outlined" onChange={(pw) => setPassword(pw.target.value)} value={password}/>
                    <TextField required name = "repPasswd" id="passwordConf" label={t("register.confPassword")} type="password" variant="outlined" onChange={(pw) => setPasswordConf(pw.target.value)} value={passwordConf}/>
                    <br/>
                    <RGPDConditions setRGPDCond={setRGPDCond} RGPDCond={RGPDCond}/>
                    <Button className="boton" id = "siguiente1" variant="contained" onClick={() => siguiente(1)}>{t("button.next")}</Button>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <Box
                  component="form"
                  sx={{
                      '& .MuiTextField-root': { m: 3, width: porcentajeAncho },
                  }}
                  noValidate
                  autoComplete="off"
                  >
                  <TextField id="tipoUsuario" select value={tipoUsu} label={t("register.typeUser")} onChange={(tipo) => setTipoUsu(tipo.target.value)}>
                    {idioma === "es" && tipoUsuario.map((tipo) => (
                      <MenuItem key={tipo} value={tipo}>
                        {tipo}
                      </MenuItem>
                    ))}
                    {idioma === "en" && tipoUsuarioIngles.map((tipo, index) => (
                      <MenuItem key={tipo} value={tipoUsuario[index]}>
                        {tipo}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField id="generoFav" select value={generoFav} label={t("register.genre")} onChange={(genero) => setGeneroFav(genero.target.value)}>
                    {idioma === "es" && generos.map((genero) => (
                      <MenuItem key={genero} value={genero}>
                        {genero}
                      </MenuItem>
                    ))}
                    {idioma === "en" && generosIngles.map((genero, index) => (
                      <MenuItem key={genero} value={generos[index]}>
                        {genero}
                      </MenuItem>
                    ))}
                  </TextField>
                  <br/>
                  {tipoUsu !== "Estándar" && <TextField id="spotyName" label="ID Spotify" variant="outlined" onChange={(spotyName) => setNomSpoty(spotyName.target.value)} value={nomSpoty}/>}
                  <br/>
                  <Grid container alignItems="center" justifyContent="center">
                    <Accordion style={{ width: 'auto' }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>{t("register.social")}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <TextField style={{ width: 'auto' }} InputProps={{startAdornment: (<InputAdornment position="start"><InstagramIcon /></InputAdornment>),}} 
                        id="Instagram" label="Instagram" variant="outlined" value={redesSociales[0]} onChange={(ins) => {handleRedesSociales(0, ins.target.value)}}/>
                        <TextField style={{ width: 'auto' }} InputProps={{startAdornment: (<InputAdornment position="start"><TwitterIcon /></InputAdornment>),}}
                        id="Twitter" label="Twitter" variant="outlined" value={redesSociales[1]} onChange={(tw) => handleRedesSociales(1, tw.target.value)}/>
                        <TextField style={{ width: 'auto' }} InputProps={{startAdornment: (<InputAdornment position="start"><YouTubeIcon /></InputAdornment>),}}
                        id="YouTube" label="YouTube" variant="outlined" value={redesSociales[2]} onChange={(yt) => handleRedesSociales(2, yt.target.value)}/>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  <br/>
                  
                  <Textarea color="neutral" style={{ width: '50%', fontSize:'1em' }} minRows={10} placeholder={t("register.description")}
                          id="texto" onChange={(text) => setDescripcion(text.target.value)} value={descripcion}/>
                  
                  <br/>
                  {descripcion.length} / 200
                  <br/>
                  <Button className="boton" id = "siguiente2" variant="contained" onClick={() => siguiente(2)}>{t("button.next")}</Button>
              </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <RegisterCard 
              nombre={userName} pais={country} localidad={location} tipoUsu={tipoUsu} descripcion={descripcion} spotyName={nomSpoty}>
              </RegisterCard>
              <br/>
              {t("register.photo")} <input type="file" onChange={actualizaArchivo} />
              <br/>
              <Grid container justifyContent="center" p={2}>
                <ReCAPTCHA ref={captchaRef} sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY + ""}/>
              </Grid>
              <Button className="boton" id="registrarse" variant="contained" onClick={registrarse}>{t("button.register")}</Button>
            </TabPanel>
            <p>{t("register.login")}<Link href="/login" >{t("about.here")}</Link>!</p>
            <p>{t("register.idSpo")} <Link href="/idspotify" >{t("about.here")}</Link></p>
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