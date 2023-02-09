import './App.css';
import Home from "./pages/Home"
import InicioSesion from "./pages/Login"
import NavBar from "./components/NavBar";
import Footer from './components/Footer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const App = () => {

  return(
    <div className="App">
      <Router>
				<NavBar />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<InicioSesion/>}/>
            <Route path='/register' element={<Home/>}/>
            <Route path='/aboutSocialfs' element={<Home/>}/>
            <Route path='/follow' element={<Home/>}/>
          </Routes>
				<Footer />
      </Router>
		</div>
  );
}

export default App;
