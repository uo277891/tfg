import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from "../localStorage/useLocalStorage";

/**
 * Devuelve los filtros a aplicar para las publicaciones
 * @param props Atributos que se deben modificar en la página si cambian su estado en este componente
 * @returns Filtros disponibles
 */
function FiltrosPublicaciones(props: any) {

    const tipoPublicacion: string[] = [ "Todos", "Solo texto", "Imágenes", "Audios"]
    const tipoPublicacionIngles: string[] = [ "All", "Only text", "Photo", "Audios"]

    const tiposOrdenacion: string[] = ["Fecha", "Número de me gustas"]
    const tiposOrdenacionIngles: string[] = ["Date", "Number of likes"]

    const[tipoPub, setTipoPub] = React.useState("");

    const[tipoOrd, setTipoOrd] = React.useState("");

    const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

    const { i18n, t } = useTranslation()

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

    useEffect(() => {
      i18n.changeLanguage(idioma)
  }, [])
    
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
                {idioma === "es" && tipoPublicacion.map((tipo) => (
                  <MenuItem role="tipoPub" key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
                {idioma === "en" && tipoPublicacionIngles.map((tipo, index) => (
                  <MenuItem role="tipoPub" key={tipo} value={tipoPublicacion[index]}>
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
          {idioma === "es" && tiposOrdenacion.map((ord) => (
            <MenuItem key={ord} value={ord}>
              {ord}
            </MenuItem>
          ))}
          {idioma === "en" && tiposOrdenacionIngles.map((ord, index) => (
            <MenuItem key={ord} value={tiposOrdenacion[index]}>
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
