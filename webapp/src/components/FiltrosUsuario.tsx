import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React from "react";
import listaPaises from "../util/listaPaises";
import Slider from "@mui/material/Slider";

const paises = listaPaises()

function FiltrosUsuario(props: any) {

    const tipoUsuario: string[] = ["Artista", "Promotor", "Estándar"]

    const[tipoUsu, setTipoUsu] = React.useState("");

    const[country, setCountry] = React.useState("");

    const [filtroEdad, setFiltroEdad] = React.useState<number[]>([0, 150]);

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
          min={0}
          max={150}
          onChange={handleChangeEdad}
          valueLabelDisplay="auto"
        />)
  }
    else{
        return <p></p>
    }
}

export default FiltrosUsuario;
