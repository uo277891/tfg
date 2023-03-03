import './App.css';
import Home from "./pages/Home"
import InicioSesion from "./pages/Login"
import Register from "./pages/Register"
import AboutSocialFS from './pages/AboutSocialFS';
import NavBar from "./components/NavBar";
import Footer from './components/Footer';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Logout from './pages/Logout';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const App = () => {

  return(
    <div className="App">
      <Router>
          <NavBar />
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<InicioSesion/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/aboutSocialfs' element={<AboutSocialFS/>}/>
              <Route path='/follow' element={<Home/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/profile/edit' element={<EditProfile/>}/>
              <Route path='/logout' element={<Logout/>}/>
            </Routes>
          <Footer />
      </Router>
		</div>
  );
}

export default App;
