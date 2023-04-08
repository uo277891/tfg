import React, { useContext } from "react";
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

const llamadaBase = "http://localhost:5000/usuario/"
const Login = () => {

    const [usuarioAutenticado, setUsuarioAutenticado] = useLocalStorage('user', '')

    const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)
    
    const [idUser, setIdUser] = useLocalStorage('idUser', '')

    const[userName, setUserName] = React.useState("");

    const[password, setPassword] = React.useState("");

    const [loginError, setLoginError] = React.useState(false);

    const [login, setLogin] = React.useState(false);

    const [error, seterror] = React.useState("");

    const [loginCompleted, setLoginErrorCompleted] = React.useState("");

    const redirigir = useNavigate();

    async function iniciarSesion() {
        if(userName === "" || password === ""){
            setLoginError(true);
            setLogin(false);
            setUsuarioAutenticado("")
            setUsuarioEstaAcutenticado(false)
            setIdUser("")
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
                setLogin(true);
                setLoginErrorCompleted("Inicio de sesión correcto");
                setUsuarioAutenticado(userName.toLowerCase())
                setUsuarioEstaAcutenticado(true)
                setIdUser(user.usuario._id)
                redirigir("/profile/" + user.usuario._id)
              }
              else{
                setLoginError(true);
                setLogin(false);
                seterror("Las credenciales no son correctas");
                setUserName("");
                setPassword("");
                setUsuarioAutenticado("")
                setUsuarioEstaAcutenticado(false)
                setIdUser("")
              }
            })
        }
    }

  return (
    <div id="login" className="forms">
      <main>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 3, width: '40ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <h1>Iniciar Sesión</h1>
            <TextField id="userName" label="Usuario" variant="outlined" onChange={(user) => setUserName(user.target.value)} value={userName}/>
            <div>
                <TextField id="password" label="Contraseña" type="password" variant="outlined" onChange={(pw) => setPassword(pw.target.value)} value={password}/>
            </div>
            <Button className="boton" variant="contained" onClick={iniciarSesion}>Iniciar Sesión</Button>
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

      <Box sx={{ width: '100%' }}>
      <Collapse in={login}>
        <Alert
            severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setLogin(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {loginCompleted}
        </Alert>
      </Collapse>
      </Box>
    </div>
  );
}

export default Login;