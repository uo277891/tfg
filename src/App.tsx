import './App.css';
import Home from "./pages/Home"
import InicioSesion from "./pages/Login"
import NavBar from "./components/NavBar";
import Footer from './components/Footer';

const App = () => {

  return(
    <div className="App">
				<NavBar />
          <InicioSesion></InicioSesion>
				<Footer />
		</div>
  );
}

export default App;
