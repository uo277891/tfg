import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Collapse from '@mui/material/Collapse';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import { useNavigate } from "react-router-dom";
import SimboloCarga from "../components/SimboloCarga";
import  Dayjs  from "dayjs";
import DOMPurify from 'dompurify';
import { getLoginError, inicioSesion } from "../conector/apiUsuarios";
import { useTranslation } from 'react-i18next';

/**
 * @returns Página para representar la identificación de un usuario
 */
const Login = () => {

    const [usuarioAutenticado, setUsuarioAutenticado] = useLocalStorage('user', '')

    const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

    const [fechaEspera, setFechaEspera] = useLocalStorage('fechaEspera', Dayjs("2023-06-08T06:36:00+00:00"))

    const [numIntentos, setNumIntentos] = useLocalStorage('numIntentos', 0)
    
    const [idUser, setIdUser] = useLocalStorage('idUser', '')

    const [cargando, setCargando] = React.useState(false);

    const[userName, setUserName] = React.useState("");

    const[password, setPassword] = React.useState("");

    const [loginError, setLoginError] = React.useState(false);

    const [error, seterror] = React.useState("");

    const[porcentajeAncho, setPorcentajeAncho] = React.useState("40%");

    const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

    const { i18n, t } = useTranslation()

    const handleResize = () => {
      if(window.innerWidth < 900){
        setPorcentajeAncho("90%")
      }else{
        setPorcentajeAncho("40%")
      }
    };

    useEffect(() => {
      i18n.changeLanguage(idioma)
      setCargando(true)
      window.addEventListener("resize", handleResize);
      setCargando(false)
  }, [])

    const redirigir = useNavigate();

    async function iniciarSesion() {
      const contraseñaLimpia = DOMPurify.sanitize(password)
      const nombreLimpio = DOMPurify.sanitize(userName)
      if(isBaneado()){
        setLoginError(true);
        setUsuarioAutenticado("")
        setUsuarioEstaAcutenticado(false)
        setIdUser("")
        seterror(t("login.numFallos"));
        setNumIntentos(0)
        await getLoginError()
      }
      else if(contraseñaLimpia !== password || nombreLimpio !== userName){
        setUserName("");
        setPassword("");
        setUsuarioAutenticado("")
        setUsuarioEstaAcutenticado(false)
        setIdUser("")
        setCargando(false)
        const num = numIntentos + 1
        setNumIntentos(num);
        setLoginError(true);
        if(num >= 10){
          seterror(t("login.numFallos"));
          setFechaEspera(Dayjs())
          await getLoginError()
        }
        else
          seterror(t("login.xssError"))
      }
      else{
        setCargando(true)
        if(userName === "" || password === ""){
            setLoginError(true);
            setUsuarioAutenticado("")
            setUsuarioEstaAcutenticado(false)
            setIdUser("")
            setCargando(false)
            const num = numIntentos + 1
            setNumIntentos(num)
            if(num >= 10){
              setFechaEspera(Dayjs())
              seterror(t("login.numFallos"));
              await getLoginError()
            }
            else
              seterror(t("login.fieldError"));
        }
        else{
          const usuario = await inicioSesion(userName.toLowerCase(), password)
          if(usuario !== null){
            setLoginError(false);
            setUsuarioAutenticado(userName.toLowerCase())
            setUsuarioEstaAcutenticado(true)
            setIdUser(usuario._id)
            setCargando(false)
            redirigir("/profile/" + usuario._id)
            window.location.reload();
          }
          else{
            setUserName("");
            setPassword("");
            setUsuarioAutenticado("")
            setUsuarioEstaAcutenticado(false)
            setIdUser("")
            setCargando(false)
            const num = numIntentos + 1
            setNumIntentos(num);
            setLoginError(true);
            if(num >= 10){
              seterror(t("login.numFallos"));
              setFechaEspera(Dayjs())
              await getLoginError()
            }
            else
              seterror(t("login.badCred"))
          }
        }
      }
    }

  const isBaneado = () => {
    const fechaAct = Dayjs();
    const difMin = fechaAct.diff(fechaEspera, "minutes")
    return difMin < 60;
  }

  isBaneado()

  if(cargando)
    return (<SimboloCarga open={cargando} close={!cargando}></SimboloCarga>)
  else
    return (
      <div id="login" className="forms">
        <main>
          <Box
              component="form"
              sx={{
                  '& .MuiTextField-root': { m: 3, width: porcentajeAncho },
              }}
              noValidate
              autoComplete="off"
              >
              <h1>{t("login.title")}</h1>
              <TextField id="userName" label={t("register.name")} variant="outlined" onChange={(user) => setUserName(user.target.value)} value={userName}/>
              <div>
                  <TextField id="password" label={t("register.password")} type="password" variant="outlined" onChange={(pw) => setPassword(pw.target.value)} value={password}/>
              </div>
              <Button className="boton" id = "inicioSesion" variant="contained" onClick={iniciarSesion}>{t("button.credentials")}</Button>
          </Box>
          <p>{t("login.register")}<Link href="/register" >{t("about.here")}</Link>!</p>
        </main>
        <Box sx={{ width: '100%' }}>
        <Collapse in={loginError}>
          <Alert
              severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setLoginError(false);
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

export default Login;