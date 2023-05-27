import * as React from 'react';
import listaPaises from "../util/paisesISO3"
import { useEffect } from "react";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";
import geoJSON from "../util/paisesMap.json"

const geoUrl = geoJSON;

    const colorScale = scaleLinear()
    .domain([0.29, 0.68])
    .range(["#f58d7c", "#ff2700"]);

const MapPaises = (props, {setTooltipContent}) => {

    const mapISO = listaPaises();

    var mapISOPorcentaje = new Map()

    const [ISOPaisesSeguidores, setISOPaisesSeguidores] = React.useState([]);

    const [porcentajeUsuarios, setPorcentajeUsuarios] = React.useState([]);

    var paises = new Map()

    function hasISO(iso){
      var esta = false
      var devolver = false
      var contador = 0;
      ISOPaisesSeguidores.map( (nomISO) => {
        if(iso == nomISO && !esta){
          esta = true
          devolver = porcentajeUsuarios[contador]
        }
        else{
          contador++
        }
      })

      return devolver
    }

    const relacionISOPorcentaje = () => {
        var contador = 0
        props.mapPaises.map((pais) => {
          contador++;
          if(paises.has(pais)) paises.set(pais, paises.get(pais) + 1)
          else paises.set(pais, 1)
        })

        paises.forEach((value, key) => {
            mapISOPorcentaje.set(mapISO.get(key), value / props.totalSeguidores)
            ISOPaisesSeguidores.push(mapISO.get(key))
            porcentajeUsuarios.push(value / contador)
        })
        console.log(porcentajeUsuarios)
    }

    useEffect(() => {
        relacionISOPorcentaje()
      }, []);

    return (
      <ComposableMap
      projectionConfig={{
        rotate: [-10, 0, 0],
        scale: 147
      }}
    >
      <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
      <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const d = hasISO(geo.id)
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  
                  onMouseEnter={() => {
                    setTooltipContent("HEYYY");
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                  fill={d ? colorScale(d) : "#C5C5C5"}
                />
              );
            })
          }
        </Geographies>
    </ComposableMap>
    );
      
}

export default MapPaises;