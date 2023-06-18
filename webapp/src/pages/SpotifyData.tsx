import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useLocalStorage } from '../localStorage/useLocalStorage';
import SimboloCarga from '../components/SimboloCarga';
import { useParams } from 'react-router-dom';
import { getAlbumes, getArtista, getArtistasSimilares, getCanciones } from '../conector/apiSpotify';
import ArtistCard from '../components/ArtistCard';
import Grid from '@mui/material/Grid';
import AlbumCard from '../components/AlbumCard';
import SongCard from '../components/SongCard';
import { useTranslation } from 'react-i18next';

/**
 * @returns Página para representar los datos de Spotify
 */
const SpotifyData = () => {

    const {idSpo} = useParams();

    const [cargando, setCargando] = React.useState(false);

    const [usuarioEstaAutenticado, setUsuarioEstaAcutenticado] = useLocalStorage('estaAutenticado', false)

    const [artista, setArtista] = React.useState<any>();

    const [albumes, setAlbumes] = React.useState<any>();

    const [canciones, setCanciones] = React.useState<any>();

    const [artistasSimilares, setArtistasSimilaes] = React.useState<any>();

    const [primeraVez, setPrimeraVez] = React.useState<any>(true);

    const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

    const { i18n, t } = useTranslation()

    const datosIniciales = useCallback(async () => {
        if(usuarioEstaAutenticado){
            setCargando(true)
            const artist = await getArtista(idSpo)
            if(artist !== undefined){
                setArtista(artist)
            }
            const albumes = await getAlbumes(idSpo)
            if(albumes !== undefined){
                setAlbumes(albumes)
            }
            const canciones = await getCanciones(idSpo)
            if(canciones !== undefined){
                setCanciones(canciones)
            }
            const artSim = await getArtistasSimilares(idSpo)
            if(artSim !== undefined){
                setArtistasSimilaes(artSim)
            }
            if(artist === undefined && primeraVez){
                setPrimeraVez(false)
                datosIniciales()
            }
            setCargando(false)
        }
    }, []);

    useEffect(() => {
        i18n.changeLanguage(idioma)
        datosIniciales();
    }, [])

    if(cargando)
        return (<SimboloCarga open={cargando} close={!cargando}></SimboloCarga>)

    else if(usuarioEstaAutenticado && artista !== undefined)
        return (
        <div className="dataSpo">
            <main>
                <h1>{t("spoData.title")}</h1>
                <p>{t("spoData.about")} <strong>{artista.name}:</strong></p>
                <ArtistCard artista = {artista} artistaPropio={true}></ArtistCard>
                <p><strong>{t("spoData.album")}</strong></p>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {albumes.map((album: any, index: number) => 
                            <Grid key = {"alb" + index} item xs={4}>
                                <AlbumCard album={album}></AlbumCard>
                            </Grid>
                        )}
                    </Grid>
                <p><strong>{t("spoData.songs")}</strong></p>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {canciones.slice(0, 6).map((cancion: any, index: number) => 
                            <Grid key = {"can" + index} item xs={4}>
                                <SongCard cancion={cancion}></SongCard>
                            </Grid>
                        )}
                    </Grid>
                <p><strong>{t("spoData.ifLike")} {artista.name} {t("spoData.ifLike2")}</strong></p>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {artistasSimilares.slice(0, 12).map((art: any, index: number) => 
                            <Grid key = {"art" + index} item xs={3}>
                                <ArtistCard artista = {art} artistaPropio={false}></ArtistCard>
                            </Grid>
                        )}
                    </Grid>
            </main>
        </div>
        );
        else if(!usuarioEstaAutenticado)
            return (<h1>{t("fallos.noIdent")}</h1>)
        else
            return (<h1>{t("fallos.noSpo")}</h1>)
}

export default SpotifyData;