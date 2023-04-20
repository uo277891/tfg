import logoSpo from "../images/SpotifyLogo.png"

const ExplicacionSpotify = () => {

  return (
    <div className="expSpo">
        <main>
            <h1>Qué datos se extraen de Spotify</h1>
            <p>Una vez nos proporciones tu ID de Spotify, a través de la API se sacarán los siguientes datos:</p>
        </main>
        <section>
            <ul>
                <li><strong>Sobre ti</strong></li>
                    <ul>
                        <li>Imagen de perfil.</li>
                        <li>Géneros con los que se te relaciona.</li>
                        <li>Popularidad en la plataforma.</li>
                        <li>Número de seguidores.</li>
                        <li>Enlace a tu perfil de Spotify.</li>
                    </ul>
                <li><strong>Tus 6 álbumes más populares</strong></li>
                    <ul>
                        <li>Imagen del álbum.</li>
                        <li>Fecha de salida.</li>
                        <li>Número de canciones.</li>
                        <li>Artistas que participan.</li>
                        <li>Enlace al álbum.</li>
                    </ul>
                <li><strong>Tus 6 canciones más populares</strong></li>
                    <ul>
                        <li>Imagen del álbum o canción.</li>
                        <li>Álbum al que pertenece.</li>
                        <li>Fecha de salida.</li>
                        <li>Artistas que participan.</li>
                        <li>Popularidad en la plataforma.</li>
                        <li>Duración.</li>
                        <li>Extracto de la canción.</li>
                        <li>Enlace a la canción.</li>
                    </ul>
                <li><strong>Artistas similares a ti (según Spotify)</strong></li>
                    <ul>
                        <li>Mismos datos que se muestran para tu perfil.</li>
                    </ul>
            </ul>
        </section>
        <aside>
            <img src={logoSpo} alt="Logo Spotify"></img>
        </aside>
      </div>
  );
}

export default ExplicacionSpotify;