import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCallback, useEffect } from 'react';
import { getUsuarios, getUsuario, getUsuarioByIdInDate } from '../conector/apiUsuarios';
import { useLocalStorage } from '../localStorage/useLocalStorage';
import  Dayjs from 'dayjs';
import { getFollowsByUser } from '../conector/apiSeguidores';
import { Usuario } from '../interfaces/interfaces';
import SimboloCarga from '../components/SimboloCarga';
import {Bar} from 'react-chartjs-2'
import {PolarArea} from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, RadialLinearScale, Tooltip, Legend, ArcElement } from "chart.js";
import { Grid } from '@mui/material';
import MapPaises from '../components/MapPaises';
import { useTranslation } from 'react-i18next';

ChartJS.register(CategoryScale);
ChartJS.register(LinearScale);
ChartJS.register(RadialLinearScale);
ChartJS.register(BarElement);
ChartJS.register(ArcElement);
ChartJS.register(Tooltip);
ChartJS.register(Legend);

/**
 * @returns Página para representar las estadísticas de los seguidores de un usuario identificado
 */
const Estadisticas = () => {

  var listadoGeneros: string[] = ["FreeStyle", "Rap", "Trap", "Pop", "Rock", "Otro"]
  var listadoGenerosIngles: string[] = ["FreeStyle", "Rap", "Trap", "Pop", "Rock", "Other"]

  const [open, setOpen] = React.useState(false);

  const [cargando, setCargando] = React.useState(false);

  const [sinSeguidores, setSinSeguidores] = React.useState(false);

  const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

  const [idUser, setIdUser] = useLocalStorage('idUser', '')

  const [porcentajesEdad, setPorcentajesEdad] = React.useState<number[]>([0, 0, 0]);

  const [usuario, setUsuario] = React.useState<Usuario>();

  const [edadMedia, setEdadMedia] = React.useState(0);

  const [textoEdad, setTextoEdad] = React.useState<string[]>(["Joven", "Adulto", "Mayor"]);
  const [textoEdadIngles, setTextoEdadIngles] = React.useState<string[]>(["Young", "Adult", "Senior"]);

  const [paises, setPaises] = React.useState<string[]>([]);

  const [porcentajesGenero, setPorcentajesGenero] = React.useState<number[]>([]);

  const [generos, setGeneros] = React.useState<string[]>([])

  const [totalSeguidores, setTotalSeguidores] = React.useState<number>(0)

  const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

  const { i18n, t } = useTranslation()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function calculoFechas(fechasNaciminento: any[]){
    var sumaFechas = 0;
    fechasNaciminento.map((fecha) => {
      const fechaAct = Dayjs()
      const diferencia = fechaAct.year() - fecha.year()
      sumaFechas += diferencia
    })
    setEdadMedia(Number((sumaFechas / fechasNaciminento.length).toFixed(0)))
  }

  function calculoGeneroFavorito(genero: string, generos: string[]){
    var contador = 0
    generos.map((gen: string) => {if(gen === genero) contador++})
    porcentajesGenero.push((contador / generos.length) * 100)
}

  const datosIniciales = useCallback(async () => {
    if(usuarioEstaAutenticado){
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
        objUsers.map((user: any) => {paises.push(user.pais)})
        objUsers.map((user: any) => {generos.push(user.genero)})
        listadoGeneros.map((genero: string) => calculoGeneroFavorito(genero, generos))
        const usuariosJovenes = await getUsuarioByIdInDate(users, 2023 - 16, 2023 - 30)
        porcentajesEdad[0] = Number((usuariosJovenes.length / users.length).toFixed(4)) * 100
        const usuariosAdultos = await getUsuarioByIdInDate(users, 2023 - 31, 2023 - 65)
        porcentajesEdad[1] = Number((usuariosAdultos.length / users.length).toFixed(4)) * 100
        const usuariosMayores = await getUsuarioByIdInDate(users, 2023 - 65, 2023 - 150)
        porcentajesEdad[2] = Number((usuariosMayores.length / users.length).toFixed(4)) * 100
        setCargando(false)
    }
      setSinSeguidores(users.length > 0)
      setTotalSeguidores(users.length)
      setCargando(false)
    }
    else{
      setSinSeguidores(false)
      setCargando(false)
    }
  }, []);

  useEffect(() => {
    i18n.changeLanguage(idioma)
    datosIniciales();
  }, [])

  if(cargando)
    return (<SimboloCarga open={cargando} close={!cargando}></SimboloCarga>)

  else if(usuarioEstaAutenticado && sinSeguidores && usuario !== undefined){

    const listaEdad = idioma === "es" ? textoEdad : textoEdadIngles

    const grafica = {
      labels: listaEdad,
      datasets:[{
        label: t("stats.ageLabel"),
        backgroundColor: [
          'rgba(91, 255, 51, 0.8)',
          'rgba(255, 178, 51, 0.8)',
          'rgba(223, 33, 53, 0.8)'
        ],
        borderColor: 'black',
        borderWidth: 0.5,
        data: porcentajesEdad
      }]
    }
    
    const listaGenero = idioma === "es" ? listadoGeneros : listadoGenerosIngles
    
    const graficaPolar = {
      labels: listaGenero,
      datasets:[{
        label: t("stats.genreLabel"),
        backgroundColor: [
          'rgba(91, 255, 51, 0.8)',
          'rgba(255, 178, 51, 0.8)',
          'rgba(223, 33, 53, 0.8)',
          'rgba(140, 33, 223, 0.8)',
          'rgba(33, 145, 223, 0.8)',
          'rgba(205, 170, 129, 0.8)'
        ],
        borderColor: 'black',
        borderWidth: 0.5,
        data: porcentajesGenero
      }]
    }
   
    return (
      <div className="est">
        <main>
          <h1>{t("stats.title")}</h1>
          <p>{t("stats.subtitle")}</p>
            <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content"id="panel1a-header">
              <Typography variant='h4'>{t("stats.age")}</Typography>
            </AccordionSummary>
            <Grid container justifyContent="center">
              <Grid item xs={8}>
                <Bar data={grafica}/>
              </Grid>
            </Grid>
            <Typography display={'inline'}>{t("stats.middleAge")}</Typography>
            <Typography display={'inline'} variant="h4"> {edadMedia} {t("stats.ageText")} </Typography>
            <br/>
            <Button variant="contained" className='boton' onClick={handleClickOpen} startIcon={<QuestionMarkIcon />}>{t("button.age")}</Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>
                {t("stats.ageRange")}
              </DialogTitle>
              <DialogContent>
                <DialogContentText> {t("stats.young")} </DialogContentText>
                <DialogContentText> {t("stats.adult")} </DialogContentText>
                <DialogContentText> {t("stats.senior")} </DialogContentText>
              </DialogContent>
            </Dialog>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography variant='h4'>{t("stats.country")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Grid container justifyContent="center">
              <Grid item xs={8}>
                <MapPaises totalSeguidores={totalSeguidores} mapPaises={paises}></MapPaises>
              </Grid>
            </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography variant='h4'>{t("stats.genre")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Grid container justifyContent="center">
              <Grid item xs={6}>
                <PolarArea data={graficaPolar}/>
              </Grid>
            </Grid>
            </AccordionDetails>
          </Accordion>
        </main>
      </div>
    );
  }
    else if(!usuarioEstaAutenticado)
      return (<h1>{t("fallos.noIdent")}</h1>)
    else
      return (<h1>{t("fallos.noSeg")}</h1>)
}

export default Estadisticas;