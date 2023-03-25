import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

const CommentCard = () => {

  return (
    <Card sx={{ maxWidth: 600, m: 1.5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="Nombre usuario"
        subheader="Fecha comentario"
      />
      <CardContent>
        <Typography variant="body1" fontSize={17}>
          Increible publicacion
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CommentCard;