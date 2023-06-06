import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React from "react";

/**
 * Devuelve los filtros a aplicar para las publicaciones
 * @param props Atributos que se deben modificar en la página si cambian su estado en este componente
 * @returns Filtros disponibles
 */
function FiltrosPublicaciones(props: any) {

    const tipoPublicacion: string[] = [ "Todos", "Solo texto", "Imágenes", "Audios"]

    const tiposOrdenacion: string[] = ["Fecha", "Número de me gustas"]

    const[tipoPub, setTipoPub] = React.useState("");

    const[tipoOrd, setTipoOrd] = React.useState("");

    const handleChangePublicacion = (e:any) => {
        setTipoPub(e)
        if(e === "Todos")
            props.setFiltroPublicacion("todos");
        else if(e === "Solo texto")
            props.setFiltroPublicacion("txt");
        else if(e === "Imágenes")
            props.setFiltroPublicacion("img");
        else if(e === "Audios")
            props.setFiltroPublicacion("iframe");
    };

    const handleChangeOrdenacion = (e:any) => {
        setTipoOrd(e);
        if(e === "Fecha")
            props.setOrdenadoFecha("fecha");
        else
            props.setOrdenadoFecha("likes");
    };
    
    if(props.index === 0){
      return (
          <TextField
                id="pub"
                select
                value={tipoPub}
                fullWidth
                role="publicaciones"
                onChange={(tipo: any) => handleChangePublicacion(tipo.target.value)}
              >
                {tipoPublicacion.map((tipo) => (
                  <MenuItem role="tipoPub" key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </TextField>
        );
    }else if(props.index === 1){
      return (
        <TextField
          id="tipoOrd"
          select
          value={tipoOrd}
          fullWidth
          onChange={(ord) => handleChangeOrdenacion(ord.target.value)}
          >
          {tiposOrdenacion.map((ord) => (
            <MenuItem key={ord} value={ord}>
              {ord}
            </MenuItem>
          ))}
      </TextField>
      );
    }
    else{
        return <p></p>
    }
}

export default FiltrosPublicaciones;
