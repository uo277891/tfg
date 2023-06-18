import logoSpo from "../images/SpotifyLogo.png"
import { useLocalStorage } from "../localStorage/useLocalStorage";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

/**
 * @returns Página para representar los datos que se expondrán en caso de proporcionar un ID de Spotify válido
 */
const ExplicacionSpotify = () => {

    const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

    const { i18n, t } = useTranslation()

    useEffect(() => {
        i18n.changeLanguage(idioma)
    }, [])

  return (
    <div className="expSpo">
        <main>
            <h1>{t("dataSpo.title")}</h1>
            <p>{t("dataSpo.subtitle")}</p>
        </main>
        <section>
            <ul>
                <li><strong>{t("dataSpo.artTit")}</strong></li>
                    <ul>
                        <li>{t("dataSpo.artImg")}</li>
                        <li>{t("dataSpo.artGen")}</li>
                        <li>{t("dataSpo.artPop")}</li>
                        <li>{t("dataSpo.artSeg")}</li>
                        <li>{t("dataSpo.artLink")}</li>
                    </ul>
                <li><strong>{t("dataSpo.albTit")}</strong></li>
                    <ul>
                        <li>{t("dataSpo.albImg")}</li>
                        <li>{t("dataSpo.albFec")}</li>
                        <li>{t("dataSpo.albNum")}</li>
                        <li>{t("dataSpo.albArt")}</li>
                        <li>{t("dataSpo.albLink")}</li>
                    </ul>
                <li><strong>{t("dataSpo.sonTit")}</strong></li>
                    <ul>
                        <li>{t("dataSpo.sonImg")}</li>
                        <li>{t("dataSpo.sonAlb")}</li>
                        <li>{t("dataSpo.sonFec")}</li>
                        <li>{t("dataSpo.sonArt")}</li>
                        <li>{t("dataSpo.sonPup")}</li>
                        <li>{t("dataSpo.sonDur")}</li>
                        <li>{t("dataSpo.sonExt")}</li>
                        <li>{t("dataSpo.sonLink")}</li>
                    </ul>
                <li><strong>{t("dataSpo.simTit")}</strong></li>
                    <ul>
                        <li>{t("dataSpo.simSubTit")}</li>
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