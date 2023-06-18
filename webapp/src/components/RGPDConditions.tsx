import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useLocalStorage } from "../localStorage/useLocalStorage";

export default function RGPDConditions(props:any) {

  const [open, setOpen] = React.useState(false);

  const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

  const { i18n, t } = useTranslation()

  useEffect(() => {
      i18n.changeLanguage(idioma)
  }, [])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [acept, setAcept] = React.useState(props.RGPDCond);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setRGPDCond(event.target.checked)
    setAcept(event.target.checked);
  };

  return (
    <div className="forms">
      <FormControlLabel control={<Checkbox id="condCheck" checked={acept} onChange={handleChange} />} label={t("rgpd.conditions")}></FormControlLabel>
      <Button variant="contained" size="small" className="boton" id="condiciones" onClick={handleClickOpen}>
        {t("button.rgpd")}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="condiciones_rgpd"
        aria-describedby="condiciones-aplicar"
      >
        <DialogTitle id="condiciones_rgpd-title">
          {t("rgpd.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="condiciones_rgpd-description">
            <ul>
                <li>
                  {t("rgpd.cond1")}
                </li>
                <li>
                  {t("rgpd.cond2")}
                </li>
                <li>
                  {t("rgpd.cond3")}
                </li>
                <li>
                  {t("rgpd.cond4")}
                </li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("button.close")}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}