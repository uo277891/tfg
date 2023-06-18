import { Divider } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useLocalStorage } from "../localStorage/useLocalStorage";

/**
 * Pie de página
 * @returns Renderiza el pie de página y lo devuelve
 */
function Footer() {

	const [idioma, setIdioma] = useLocalStorage('idioma', 'es')

    const { i18n, t } = useTranslation()

    useEffect(() => {
        i18n.changeLanguage(idioma)
    }, [])

	return (
		<footer>
			<Divider/>
			<p>{t("footer.text1")}</p>
			<p>{t("footer.text2")}</p>
		</footer>
	);
}

export default Footer;
