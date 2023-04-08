import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StatCard from '../components/StatCard';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCallback, useEffect } from 'react';
import { getFollowsByUser, getUsuario, getUsuarioByIdInDate } from '../accesoApi/api';
import { useLocalStorage } from '../localStorage/useLocalStorage';
import  Dayjs from 'dayjs';
import { getUsuarios } from '../accesoApi/api';
import GeneroCard from '../components/GeneroCard';
import { Usuario } from '../interfaces/interfaces';

const Estadisticas = () => {

  const [open, setOpen] = React.useState(false);

  const [cargando, setCargando] = React.useState(false);

  const [usuarioAutenticado, setUsuarioAutenticado] = useLocalStorage('user', '')

  const [idUser, setIdUser] = useLocalStorage('idUser', '')

  const [porcentajesEdad, setPorcentajesEdad] = React.useState<number[]>([0, 0, 0]);

  const [usuario, setUsuario] = React.useState<Usuario>();

  const [edadMedia, setEdadMedia] = React.useState(0);

  const [posicionesTexto, setPosicionesTexto] = React.useState<number[]>([]);

  const [textoEdad, setTextoEdad] = React.useState<string[]>(["Jóven", "Adulto", "Mayor"]);

  const [textoPais, setTextoPais] = React.useState<string[]>(["", "", ""]);

  const [porcentajesPais, setPorcentajesPais] = React.useState<number[]>([0,0,0]);

  const [generos, setGeneros] = React.useState<string[]>([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function calculoPaises(fechasPaises: string[]){
    var hashmap = new Map();
    fechasPaises.map((pais:string) => {
      if(hashmap.has(pais)) hashmap.set(pais, hashmap.get(pais) + 1)
      else hashmap.set(pais, 1)
    })
    hashmap.forEach((num: number, pais: string) => {
      if(num > porcentajesPais[0]) {
        porcentajesPais[2] = porcentajesPais[1] 
        porcentajesPais[1] = porcentajesPais[0]
        porcentajesPais[0] = num
        textoPais[2] = textoPais[1]
        textoPais[1] = textoPais[0]
        textoPais[0] = pais
      }
      else if(num > porcentajesPais[1]) {
        porcentajesPais[2] = porcentajesPais[1] 
        porcentajesPais[1] = num
        textoPais[2] = textoPais[1]
        textoPais[1] = pais
      }
      else if(num > porcentajesPais[2]) {
        porcentajesPais[2] = num
        textoPais[2] = pais
      }
    });
    porcentajesPais[0] = Number((porcentajesPais[0] / fechasPaises.length).toFixed(2)) * 100
    porcentajesPais[1] = Number((porcentajesPais[1] / fechasPaises.length).toFixed(2)) * 100
    porcentajesPais[2] = Number((porcentajesPais[2] / fechasPaises.length).toFixed(2)) * 100
  }

  function calculoFechas(fechasNaciminento: any[]){
    var sumaFechas = 0;
    fechasNaciminento.map((fecha) => {
      const fechaAct = Dayjs()
      const diferencia = fechaAct.year() - fecha.year()
      sumaFechas += diferencia
    })
    setEdadMedia(Number((sumaFechas / fechasNaciminento.length).toFixed(0)))
  }

  const datosIniciales = useCallback(async () => {
    setCargando(true)
    const user = await getUsuario(idUser)
    if(user[0] !== undefined)
      setUsuario(user[0])
    const users = await getFollowsByUser(idUser)
    const objUsers = await getUsuarios(users)
    if(users.length > 0){
      var fechasNaciminento: any[] = []
      objUsers.map((user: any) => {fechasNaciminento.push(Dayjs(user.fecha_nac))})
      calculoFechas(fechasNaciminento);
      var paises: string[] = []
      objUsers.map((user: any) => {paises.push(user.pais)})
      calculoPaises(paises);
      objUsers.map((user: any) => {generos.push(user.genero)})
      console.log(generos)
      const usuariosJovenes = await getUsuarioByIdInDate(users, 2023 - 16, 2023 - 30)
      porcentajesEdad[0] = Number((usuariosJovenes.length / users.length).toFixed(2)) * 100
      const usuariosAdultos = await getUsuarioByIdInDate(users, 2023 - 31, 2023 - 65)
      porcentajesEdad[1] = Number((usuariosAdultos.length / users.length).toFixed(2)) * 100
      const usuariosMayores = await getUsuarioByIdInDate(users, 2023 - 65, 2023 - 150)
      porcentajesEdad[2] = Number((usuariosMayores.length / users.length).toFixed(2)) * 100
      var contador = 0
      while(contador < porcentajesEdad.length){
        const indice = porcentajesEdad.indexOf(Math.max(...porcentajesEdad));
        posicionesTexto[contador] = indice
        porcentajesEdad[indice] = -1
        contador++;
      }
      porcentajesEdad[0] = Number((usuariosJovenes.length / users.length).toFixed(2)) * 100
      porcentajesEdad[1] = Number((usuariosAdultos.length / users.length).toFixed(2)) * 100
      porcentajesEdad[2] = Number((usuariosMayores.length / users.length).toFixed(2)) * 100
      setCargando(false)
    }
  }, []);

  useEffect(() => {
    datosIniciales();
  }, [])

  if(usuarioAutenticado && !cargando && usuario !== undefined)
    return (
      <div className="est">
        <main>
          <h1>Estadísticas</h1>
          <p>¡Consulta tus estadísticas en base a las personas que te siguen!</p>
            <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content"id="panel1a-header">
              <Typography variant='h4'>Estadísticas por edad</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <StatCard fem="a" tipo="edad" est1={textoEdad[posicionesTexto[0]]} est2={textoEdad[posicionesTexto[1]]} est3={textoEdad[posicionesTexto[2]]} 
                prob1={porcentajesEdad[posicionesTexto[0]]} prob2={porcentajesEdad[posicionesTexto[1]]} prob3={porcentajesEdad[posicionesTexto[2]]}></StatCard>
              <Typography display={'inline'}> La media de edad de tus seguidores es de </Typography>
              <Typography display={'inline'} variant="h4"> {edadMedia} años </Typography>
            </AccordionDetails>
            <Button variant="contained" className='boton' onClick={handleClickOpen} startIcon={<QuestionMarkIcon />}> Rangos de edad </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>
                {"¿Cuáles son los rangos de edad?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText> Jóvenes: Entre 16 y 30 años. </DialogContentText>
                <DialogContentText> Adultos: Entre 31 y 65 años. </DialogContentText>
                <DialogContentText> Mayores: Entre 65 y 150 años. </DialogContentText>
              </DialogContent>
            </Dialog>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography variant='h4'>Estadísticas por país</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <StatCard fem="o" tipo="país" est1={textoPais[0]} est2={textoPais[1]} est3={textoPais[2]} 
                prob1={porcentajesPais[0]} prob2={porcentajesPais[1]} prob3={porcentajesPais[2]}></StatCard>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography variant='h4'>Estadísticas por géneros</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <GeneroCard genero={usuario.genero} generos = {generos}></GeneroCard>
            </AccordionDetails>
          </Accordion>
        </main>
      </div>
    );
    else if(!usuarioAutenticado)
      return (<h1>Inicia sesión para ver tus estadísticas</h1>)
    else
      return (<h1>No tienes seguidores para mostrar tus estadísticas</h1>)
}

export default Estadisticas;