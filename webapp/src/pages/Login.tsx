import React, { useContext, useEffect } from "react";
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

const llamadaBase = "http://localhost:5000/usuario/"

/**
 * @returns Página para representar la identificación de un usuario
 */
const Login = () => {

    const [usuarioAutenticado, setUsuarioAutenticado] = useLocalStorage('user', '')

    const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

    const [fechaEspera, setFechaEspera] = useLocalStorage('fechaEspera', Dayjs("2023-06-08T06:36:00+00:00"))
    
    const [idUser, setIdUser] = useLocalStorage('idUser', '')

    const [cargando, setCargando] = React.useState(false);

    const [numIntentos, setNumIntentos] = React.useState(0);

    const[userName, setUserName] = React.useState("");

    const[password, setPassword] = React.useState("");

    const [loginError, setLoginError] = React.useState(false);

    const [error, seterror] = React.useState("");

    const[porcentajeAncho, setPorcentajeAncho] = React.useState("40%");

    const handleResize = () => {
      if(window.innerWidth < 900){
        setPorcentajeAncho("90%")
      }else{
        setPorcentajeAncho("40%")
      }
    };

    useEffect(() => {
      setCargando(true)
      window.addEventListener("resize", handleResize);
      setCargando(false)
  }, [])

    const redirigir = useNavigate();

    async function iniciarSesion() {
      if(isBaneado()){
          setLoginError(true);
          setUsuarioAutenticado("")
          setUsuarioEstaAcutenticado(false)
          setIdUser("")
          seterror("Ha superado el límite de intentos para iniciar sesión. Inténtelo de nuevo más tarde.");
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
              seterror("Ha superado el límite de intentos para iniciar sesión. Inténtelo de nuevo más tarde.");
            }
            else
              seterror("Algún campo está vacío");
        }
        else{
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: userName.toLowerCase(), contraseña: password })
        };
          fetch(llamadaBase + "login", requestOptions)
            .then(async (response) => 
            {
              if(response.ok){
                const user = await response.json()
                setLoginError(false);
                setUsuarioAutenticado(userName.toLowerCase())
                setUsuarioEstaAcutenticado(true)
                setIdUser(user.usuario._id)
                setCargando(false)
                redirigir("/profile/" + user.usuario._id)
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
                  seterror("Ha superado el límite de intentos para iniciar sesión. Inténtelo de nuevo más tarde.");
                  setFechaEspera(Dayjs())
                }
                else
                  seterror("Las credenciales no son correctas")
              }
            })
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
              <h1>Iniciar Sesión</h1>
              <TextField id="userName" label="Usuario" variant="outlined" onChange={(user) => setUserName(user.target.value)} value={userName}/>
              <div>
                  <TextField id="password" label="Contraseña" type="password" variant="outlined" onChange={(pw) => setPassword(pw.target.value)} value={password}/>
              </div>
              <Button className="boton" id = "inicioSesion" variant="contained" onClick={iniciarSesion}>Comprobar credenciales</Button>
          </Box>
          <p>Si no tienes cuenta, ¡crea una ahora pulsando <Link href="/register" >aquí</Link>!</p>
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