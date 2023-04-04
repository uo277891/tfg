import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function RegisterCard (props: any) {
  return (
        <Card sx={{ margin: "auto", maxWidth: 400, minHeight:200 }} id="profileCard">
          <CardContent >
              <Typography gutterBottom variant="h5">
              <strong>Datos personales:</strong>
              </Typography>
              <Typography gutterBottom variant="h6">
                Nombre*: <strong>{props.nombre}</strong>
              </Typography>
              <Typography variant="h6">
                Nacionalidad*: <strong>{props.pais}</strong>
              </Typography>
              <Typography variant="h6">
                Localidad: <strong>{props.localidad}</strong>
              </Typography>
              <Typography gutterBottom variant="h5">
                <strong>Datos del perfil:</strong>
              </Typography>
              <Typography variant="h6">
                Tipo de usuario: <strong>{props.tipoUsu}</strong>
              </Typography>
              <Typography variant="h6">
                Descripcion: <strong>{props.descripcion}</strong>
              </Typography>
              <Typography variant="h6">
                Perfil de Spotify: <strong>{props.spotyName}</strong>
              </Typography>
          </CardContent>
      </Card>
      );
}

export default RegisterCard;