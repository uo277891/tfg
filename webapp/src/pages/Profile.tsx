import CardProfile from '../components/ProfileCard';
import { useLocalStorage } from "../localStorage/useLocalStorage";

const Profile = () => {

  const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

  if(usuarioEstaAutenticado){
    return (
      <div id="profile">
        <main>
          <h1>Perfil</h1>
          <CardProfile/>
        </main>
      </div>
    );
  }else{
    return(
      <div id="profile">
        <main>
          <h1>Perfil</h1>
          <p>No hay usuario autenticado.</p>
        </main>
      </div>
    )
  }
}

export default Profile;