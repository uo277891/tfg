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

const Estadisticas = () => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="est">
      <main>
        <h1>Estadísticas</h1>
        <p>¡Consulta tus estadísticas en base a las personas que te siguen!</p>
          <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content"id="panel1a-header">
            <Typography variant='h4'>Estadísticas de edad</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <StatCard fem="a" tipo="edad" est1="Jóven" est2="Adulto" est3="Mayor" prob1="60" prob2="30" prob3="10"></StatCard>
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
            <Typography variant='h4'>Estadísticas de país</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <StatCard fem="o" tipo="país" est1="España" est2="Argentina" est3="México" prob1="50" prob2="25" prob3="25"></StatCard>
          </AccordionDetails>
        </Accordion>
      </main>
    </div>
  );
}

export default Estadisticas;