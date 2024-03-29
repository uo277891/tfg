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
import { actualizaUsuario, getUsuario } from '../conector/apiUsuarios';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import { uploadMultimedia } from "../conector/apiCloudinary";
import { useNavigate } from "react-router-dom";
import { cumpleRegistro, errorUsuario } from '../util/condicionesRegistro';
import Textarea from '@mui/base/TextareaAutosize';
import { Accordion, AccordionDetails, AccordionSummary, Grid, InputAdornment, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import SimboloCarga from '../components/SimboloCarga';
import listaPaisesIngles from '../util/listaPaisesIngles';
import { useTranslation } from 'react-i18next';

const paises = listaPaises()

const paisesIngles = listaPaisesIngles()

/**
 * @returns Página para representar la edición de un perfil
 */
const EditProfile = () => {
      
    const handleDate = (newDate: Dayjs | null) => {
        setDate(newDate);
    };

    const generos: string[] = ["FreeStyle", "Rap", "Trap", "Pop", "Rock", "Otro"]
    const generosIngles: string[] = ["FreeStyle", "Rap", "Trap", "Pop", "Rock", "Other"]

    const tipoUsuario: string[] = ["Artista", "Promotor", "Estándar"]
    const tipoUsuarioIngles: string[] = ["Artist", "Promoter", "Standard"]

    const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

    const [usuarioAutenticado, setUsuarioAutenticado] = useLocalStorage('user', '')

    const [idUser, setIdUser] = useLocalStorage('idUser', '')

    var userNameInicio = usuarioAutenticado

    const [cargando, setCargando] = React.useState(false);

    const[userName, setUserName] = React.useState("");

    const[country, setCountry] = React.useState("");

    const[location, setLocation] = React.useState("");

    const[nomSpoty, setNomSpoty] = React.useState("");

    const [registerError, setRegisterError] = React.useState(false);

    const [date, setDate] = React.useState<Dayjs | null>();

    const[descripcion, setDescripcion] = React.useState("");

    const[generoFav, setGeneroFav] = React.useState("");

    const[tipoUsu, setTipoUsu] = React.useState("");

    const[redesSociales, setRedesSociales] = React.useState<string[]>(["", "", ""]);

    const [error, seterror] = React.useState("");

    const[porcentajeAncho, setPorcentajeAncho] = React.useState("40%");

    const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

    const { i18n, t } = useTranslation()

    const redirigir = useNavigate();

    const handleResize = () => {
      if(window.innerWidth < 900){
        setPorcentajeAncho("90%")
      }else{
        setPorcentajeAncho("40%")
      }
    };

    function handleRedesSociales(indice: number, valorAct: string) {
      const redesAct = redesSociales.map((valor, i) => {
        if (i === indice) return valorAct;
        else return valor;
      });
      setRedesSociales(redesAct);
    }

    const datosIniciales = useCallback(async () => {
      if(usuarioAutenticado){
        setCargando(true)
        const user = await getUsuario(idUser)
        if(user != undefined){
          setUserName(user[0].nombre)
          setNomSpoty(user[0].nombre_spotify)
          setCountry(user[0].pais)
          setLocation(user[0].localidad)
          setDate(user[0].fecha_nac)
          setDescripcion(user[0].descripcion)
          setTipoUsu(user[0].tipo)
          setGeneroFav(user[0].genero)
          setRedesSociales(user[0].redes)
        }
        setCargando(false)
      }
    }, []);
  
    useEffect(() => {
      i18n.changeLanguage(idioma)
      datosIniciales();
      handleResize();
    }, [])

  const [archivo, setArchivo] = useState<File>();

  const actualizaArchivo = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        if(e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png"){
          setArchivo(e.target.files[0]);
        }
        else{
            setRegisterError(true);
            seterror(t("register.errorMul"));
            setArchivo(undefined);
        }
    }
  };

  async function actualizarPerfil (){
    setCargando(true)
    var url_foto = ""
    if(archivo !== undefined){
      const respuesta = await uploadMultimedia(idUser, archivo, true, true)
      if(respuesta !== ""){
        url_foto = respuesta
      }else{
        setRegisterError(true);
        seterror("Foto no actualizada");
        setCargando(false)
      }
    }

    const numError = cumpleRegistro(userName, "contraseñaQuePasa", "contraseñaQuePasa", country, location, date, descripcion, true)
      if(numError > -1){
        setRegisterError(true);
        seterror(errorUsuario(numError, idioma));
        setCargando(false)
      }
    else {
      let actualizado:Boolean = false
      if(tipoUsu === tipoUsuario[2]){
        actualizado = await actualizaUsuario(userNameInicio, userName, country, location, date, "", descripcion, tipoUsu, url_foto, generoFav, redesSociales)
      }
      else{
        actualizado = await actualizaUsuario(userNameInicio, userName, country, location, date, nomSpoty, descripcion, tipoUsu, url_foto, generoFav, redesSociales)
      }
      if(actualizado){
        setUsuarioAutenticado(userName);
        setCargando(false)
        redirigir("/profile/")
      }
      else{
        setRegisterError(true);
        seterror(t("register.errorName"));
        setCargando(false)
      }
    }
  }
  if(cargando)
    return (<SimboloCarga open={cargando} close={!cargando}></SimboloCarga>)
  else if (usuarioEstaAutenticado)
    return (
      <div id="editProfile" className="forms">
        <main>
          <Box
              component="form"
              sx={{
                  '& .MuiTextField-root': { m: 3, width: porcentajeAncho },
              }}
              noValidate
              autoComplete="off"
              >
              <h1>{t("edit.title")}</h1>
              <Button className="boton" variant="contained" onClick={datosIniciales}>{t("button.reload")}</Button>
              <br/>
              <TextField required id="userName" label={t("register.name")} variant="outlined" onChange={(user) => setUserName(user.target.value)} value={userName}/>
              <br/>
              <TextField
                id="country"
                select
                value={country}
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
              <TextField id="location" label={t("register.location")} variant="outlined" onChange={(location) => setLocation(location.target.value)} value={location}/>
              <br/>
              {tipoUsu !== "Estándar" && <TextField id="spotyName" label="ID Spotify" variant="outlined" onChange={(spotyName) => setNomSpoty(spotyName.target.value)} value={nomSpoty}/>}
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
              <Typography>{t("edit.description")}</Typography>
              <Textarea color="neutral" style={{ width: '50%', fontSize:'1em' }} minRows={10} 
                  id="texto" onChange={(text) => setDescripcion(text.target.value)} value={descripcion}/>
              <br/>
                {descripcion.length} / 200
              <br/>
              <br/>
              {t("register.photo")} <input type="file" onChange={actualizaArchivo} />
              <br/>
              <br/>
              <Button className="boton" variant="contained" onClick={actualizarPerfil}>{t("button.updateProfile")}</Button>
          </Box>
          <p>{t("edit.return")}<Link href="/profile" >{t("about.here")}</Link></p>
        </main>
        <Box component="form"
              sx={{
                  '& .MuiTextField-root': { m: 3, width: '40ch' },
              }}
              noValidate
              autoComplete="off"
              >
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
    else
            return (<h1>{t("fallos.noIdent")}</h1>)
}

export default EditProfile;