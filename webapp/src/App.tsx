import './App.css';
import Home from "./pages/Home"
import InicioSesion from "./pages/Login"
import Register from "./pages/Register"
import AboutSocialFS from './pages/AboutSocialFS';
import NavBarLeft from "./components/NavBarLeft";
import Footer from './components/Footer';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Logout from './pages/Logout';
import ExternProfile from './pages/ExternProfile';
import NewPublication from './pages/NewPublication';
import FindUsers from './pages/FindUsers';
import FollowingUsers from './pages/FollowingUsers';
import Publication from './pages/Publication';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Grid from "@mui/material/Grid";
import Estadisticas from './pages/Estadisticas';
import IDSpotify from './pages/IDSpotify';
import ExplicacionSpotify from './pages/ExplicacionSpotify';
import SpotifyData from './pages/SpotifyData';

const App = () => {

  return(
    <div className="App">
      <Grid container>
      <Router>
          <Grid item xs={2}>
            <NavBarLeft />
          </Grid>
          <Grid item xs={10}>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<InicioSesion/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/aboutSocialfs' element={<AboutSocialFS/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/profile/edit' element={<EditProfile/>}/>
              <Route path='/logout' element={<Logout/>}/>
              <Route path='/profile/:id' element={<ExternProfile/>}/>
              <Route path='/publication/new' element={<NewPublication/>}/>
              <Route path='/find' element={<FindUsers/>}/>
              <Route path='/follow' element={<FollowingUsers you={false}/>}/>
              <Route path='/follow/you' element={<FollowingUsers you={true}/>}/>
              <Route path='/publication/:id' element={<Publication/>}/>
              <Route path='/stats/' element={<Estadisticas/>}/>
              <Route path='/idspotify/' element={<IDSpotify/>}/>
              <Route path='/spotify/explanation/' element={<ExplicacionSpotify/>}/>
              <Route path='/spotify/data/:idSpo' element={<SpotifyData/>}/>
            </Routes>
            <Footer />
          </Grid>
      </Router>
      </Grid>
		</div>
  );
}

export default App;
