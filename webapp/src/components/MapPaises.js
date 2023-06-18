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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from '../localStorage/useLocalStorage';

const geoUrl = geoJSON;

    const colorScale = scaleLinear()
    .domain([0.29, 0.68])
    .range(["#f58d7c", "#ff2700"]);

const MapPaises = (props) => {

    const mapISO = listaPaises();

    var mapISOPorcentaje = new Map()

    const [ISOPaisesSeguidores, setISOPaisesSeguidores] = React.useState([]);

    const [porcentajeUsuarios, setPorcentajeUsuarios] = React.useState([]);

    const [nombrePaises, setNombrePaises] = React.useState([]);

    const [totalSeg, setTotalSeg] = React.useState(0);

    const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

    const { i18n, t } = useTranslation()

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
            nombrePaises.push(key)
        })
        setTotalSeg(contador)
    }

    useEffect(() => {
      i18n.changeLanguage(idioma)
      relacionISOPorcentaje()
    }, []);

    return (
      <Box>
        <ComposableMap projectionConfig={{ rotate: [-10, 0, 0], scale: 147}} >
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
                    
                    style={{
                      hover: {
                        fill: "#bbe2CA",
                        outline: "none"
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                    }}
                    fill={d ? colorScale(d) : "#C5C5C5"}
                    stroke="#FFF"
                    strokeWidth={0.5}
                  />
                );
              })
            }
          </Geographies>
      </ComposableMap>

        <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("stats.countryTable")}</TableCell>
              <TableCell align="right">{t("stats.percentageTable")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nombrePaises.map((text, index) => (
              <TableRow
                key={text}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {text}
                </TableCell>
                <TableCell align="right">{(Number(porcentajeUsuarios[index] * 100).toFixed(2)) + "%"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      </Box>
    );
      
}

export default MapPaises;