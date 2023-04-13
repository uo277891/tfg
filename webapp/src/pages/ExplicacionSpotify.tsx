import logoSpo from "../images/SpotifyLogo.png"

const ExplicacionSpotify = () => {

  return (
    <div className="expSpo">
        <main>
            <h1>Cómo obtener tu ID de Spotify</h1>
            <p>Una vez nos proporciones tu ID de Spotify, a través de la API se sacarán los siguientes datos:</p>
        </main>
        <section>
            <ul>
                <li><strong>Sobre ti</strong></li>
                    <ul>
                        <li>Imagen de perfil.</li>
                        <li>Género(s) con los que se te relaciona.</li>
                        <li>Popularidad en la plataforma.</li>
                        <li>Número de seguidores.</li>
                        <li>Enlace a tu perfil de Spotify.</li>
                    </ul>
                <li><strong>Tus 5 álbumes más populares</strong></li>
                    <ul>
                        <li>Imagen del álbum.</li>
                        <li>Fecha de salida.</li>
                        <li>Género(s).</li>
                        <li>Popularidad en la plataforma.</li>
                        <li>Enlace al álbum.</li>
                    </ul>
                <li><strong>Tus 5 canciones más populares</strong></li>
                    <ul>
                        <li>Imagen del álbum o canción.</li>
                        <li>Fecha de salida.</li>
                        <li>Género(s).</li>
                        <li>Álbum al que pertenece.</li>
                        <li>Artistas asociados.</li>
                        <li>Popularidad en la plataforma.</li>
                        <li>Duración.</li>
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