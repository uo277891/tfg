import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React from "react";
import listaPaises from "../util/listaPaises";
import Slider from "@mui/material/Slider";

const paises = listaPaises()

/**
 * Devuelve los filtros a aplicar para los usuarios
 * @param props Atributos que se deben modificar en la página si cambian su estado en este componente
 * @returns Filtros disponibles
 */
function FiltrosUsuario(props: any) {

    const tipoUsuario: string[] = ["Artista", "Promotor", "Estándar"]

    const generos: string[] = ["FreeStyle", "Rap", "Trap", "Pop", "Rock", "Otro"]

    const[tipoUsu, setTipoUsu] = React.useState("");

    const[country, setCountry] = React.useState("");

    const[genero, setGenero] = React.useState("");

    const [filtroEdad, setFiltroEdad] = React.useState<number[]>([16, 150]);

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
                {tipoUsuario.map((pais) => (
                  <MenuItem key={pais} value={pais}>
                    {pais}
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
          {paises.map((pais) => (
            <MenuItem key={pais} value={pais}>
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
        {generos.map((gen) => (
          <MenuItem key={gen} value={gen}>
            {gen}
          </MenuItem>
        ))}
      </TextField>)
  }
    else{
        return <p></p>
    }
}

export default FiltrosUsuario;
