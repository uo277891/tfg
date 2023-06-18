import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useLocalStorage } from "../localStorage/useLocalStorage";

/**
 * Devuelve un resumen de los datos introducidos por el usuario en un registro
 * @param props datos recibidos desde la página
 * @returns Representación del resumen de datos
 */
function RegisterCard (props: any) {

  const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

    const { i18n, t } = useTranslation()

    useEffect(() => {
        i18n.changeLanguage(idioma)
    }, [])

  return (
        <Card sx={{ margin: "auto", maxWidth: 400, minHeight:200 }} id="profileCard">
          <CardContent >
              <Typography gutterBottom variant="h5">
              <strong>{t("regCard.title1")}</strong>
              </Typography>
              <Typography gutterBottom variant="h6">
              {t("regCard.name")}<strong>{props.nombre}</strong>
              </Typography>
              <Typography variant="h6">
              {t("regCard.country")}<strong>{props.pais}</strong>
              </Typography>
              <Typography variant="h6">
              {t("regCard.location")}<strong>{props.localidad}</strong>
              </Typography>
              <Typography gutterBottom variant="h5">
                <strong>{t("regCard.title2")}</strong>
              </Typography>
              <Typography variant="h6">
              {t("regCard.userType")}<strong>{props.tipoUsu}</strong>
              </Typography>
              <Typography variant="h6">
              {t("regCard.description")}<strong>{props.descripcion}</strong>
              </Typography>
              <Typography variant="h6">
              {t("regCard.spoID")}<strong>{props.spotyName}</strong>
              </Typography>
          </CardContent>
      </Card>
      );
}

export default RegisterCard;