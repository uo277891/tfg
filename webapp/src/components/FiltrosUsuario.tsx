import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import listaPaises from "../util/listaPaises";
import Slider from "@mui/material/Slider";
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from "../localStorage/useLocalStorage";
import listaPaisesIngles from "../util/listaPaisesIngles";

const paises = listaPaises()
const paisesIngles = listaPaisesIngles()

/**
 * Devuelve los filtros a aplicar para los usuarios
 * @param props Atributos que se deben modificar en la página si cambian su estado en este componente
 * @returns Filtros disponibles
 */
function FiltrosUsuario(props: any) {

  const generos: string[] = ["FreeStyle", "Rap", "Trap", "Pop", "Rock", "Otro"]
  const generosIngles: string[] = ["FreeStyle", "Rap", "Trap", "Pop", "Rock", "Other"]

  const tipoUsuario: string[] = ["Artista", "Promotor", "Estándar"]
  const tipoUsuarioIngles: string[] = ["Artist", "Promoter", "Standard"]

    const[tipoUsu, setTipoUsu] = React.useState("");

    const[country, setCountry] = React.useState("");

    const[genero, setGenero] = React.useState("");

    const [filtroEdad, setFiltroEdad] = React.useState<number[]>([16, 150]);

    const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

    const { i18n, t } = useTranslation()

    useEffect(() => {
      i18n.changeLanguage(idioma)
    }, [])

    const handleChangeEdad = (event: Event, newValue: number | number[]) => {
        props.setFiltroEdad(newValue as number[]);
        setFiltroEdad(newValue as number[])
    };

    const handleChangeTipoUsu = (e:any) => {
        props.setFiltroTipo(e);
        setTipoUsu(e)
    };

    const handleChangePais = (e:any) => {
      props.setFiltroPais(e);
      setCountry(e)
    };

    const handleChangeGenero = (e:any) => {
      props.setFiltroGenero(e);
      setGenero(e)
    };
    
    if(props.index === 0){
      return (
          <TextField
                id="tipo"
                select
                value={tipoUsu}
                fullWidth
                onChange={(tipo: any) => handleChangeTipoUsu(tipo.target.value)}
              >
                {idioma === "es" && tipoUsuario.map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
                {idioma === "en" && tipoUsuarioIngles.map((tipo, index) => (
                  <MenuItem key={tipo} value={tipoUsuario[index]}>
                    {tipo}
                  </MenuItem>
                ))}
              </TextField>
        );
    }else if(props.index === 1){
      return (
        <TextField
          id="country"
          select
          value={country}
          fullWidth
          onChange={(country) => handleChangePais(country.target.value)}
          >
          {idioma === "es" && paises.map((pais, index) => (
            <MenuItem key={index} value={pais}>
              {pais}
            </MenuItem>
          ))}
          {idioma === "en" && paisesIngles.map((pais, index) => (
            <MenuItem key={pais} value={paises[index]}>
              {pais}
            </MenuItem>
          ))}
      </TextField>
      );
  }else if(props.index === 2){
    return(
        <Slider
          value={[filtroEdad[0], filtroEdad[1]]}
          min={16}
          max={150}
          onChange={handleChangeEdad}
          valueLabelDisplay="auto"
        />)
  }else if(props.index === 3){
    return(
      <TextField
        id="genero"
        select
        value={genero}
        fullWidth
        onChange={(genero) => handleChangeGenero(genero.target.value)}
      >
        {idioma === "es" && generos.map((genero) => (
          <MenuItem key={genero} value={genero}>
            {genero}
          </MenuItem>
        ))}
        {idioma === "en" && generosIngles.map((genero, index) => (
          <MenuItem key={genero} value={generos[index]}>
            {genero}
          </MenuItem>
        ))}
      </TextField>)
  }
    else{
        return <p></p>
    }
}

export default FiltrosUsuario;
