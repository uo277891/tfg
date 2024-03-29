import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next)
    .init({
        lng: 'es',
        fallbackLng: 'es',
        interpolation:{
            escapeValue: false
        },
        resources: {
            en: {
                translation: {
                    home: {
                        welcom1: "Welcome to ",
                        welcom2: ', the social network focused on the freestyle world!',
                        pubs: 'Latest publications',
                    },
                    navBar: {
                        follow: "Follow users",
                        follows: 'Your followers',
                        find: "Find users",
                        newPub: "New publication",
                        about: "About SocialFS",
                        idSpo: "Obtain ID Spotify",
                        dataSpo: "Spotify data",
                        acount: "Acount",
                        profile: "Profile",
                        stats: "Stats",
                        logout: "Log out",
                        delete: "Delete acount",
                        deleteTitle: "Account deletion",
                        deleteSubtitle: "If you are sure you want to delete your account, your user, along with your posts and comments will be permanently deleted."
                    },
                    newPub: {
                        title: "New publication",
                        text: "Enter the publication text",
                        photo: "Add a photo or audio to your post!",
                        errorDes0: "Something must be written in the text to create the publication.",
                        errorDes200: "The text must not exceed 200 characters.",
                        errorDesInv: "Invalid text has been detected, please modify it.",
                        errorMulTam: "Multimedia cannot be larger than 1 MB (if not changed the publication will be created without multimedia).",
                        errorMulExt: "Multimedia must have png, jpg or mp3 extension (if not changed the publication will be created without multimedia).",
                        errorNoMul: "The publication has been created, but the multimedia could not be added.",
                        errorNoPub: "An error has occurred, the publication could not be created."
                    },
                    idSpo: {
                        title: "How to get your Spotify ID",
                        step1: "Log into your spotify profile",
                        step2: "Copy the code that appears in the URL of the page.",
                        step3: "That's it, you've got your Spotify ID!"
                    },
                    dataSpo: {
                        title: "What data are extracted from Spotify",
                        subtitle: "Once you provide us with your Spotify ID, the following data will be retrieved via the API:",
                        artTit: "About you",
                        artImg: "Profile image.",
                        artGen: "Genres you are associated with.",
                        artPop: "Popularity on Spotify.",
                        artSeg: "Number of followers.",
                        artLink: "Link to your Spotify profile.",
                        albTit: "Your 6 most popular albums",
                        albImg: "Album image.",
                        albFec: "Release date.",
                        albNum: "Number of songs.",
                        albArt: "Artists.",
                        albLink: "Link to album.",
                        sonTit: "Your 6 most popular songs",
                        sonImg: "Image of the album or song.",
                        sonAlb: "Album it belongs to.",
                        sonFec: "Departure date.",
                        sonArt: "Participating artists.",
                        sonPup: "Popularity on the platform.",
                        sonDur: "Duration.",
                        sonExt: "Extract of the song.",
                        sonLink: "Link to the song.",
                        simTit: "12 artists similar to you (according to Spotify)",
                        simSubTit: "Same data as shown for your profile."
                    },
                    about:{
                        title: "About Social FS",
                        subtitle1: "Motivation",
                        exp1: 'SocialFS was born as a final degree project. Its main purpose is to allow freestylers to easily share content about their projects and event promoters to share dates and news about their events. Although it is designed for freestyle artists, any artist, mainly from the music genre, will be able to use this system, as its connection with Spotidy is valid for any artist.',
                        subtitle2: "Spotify connection",
                        exp2part1: "Spotify provides data about artists and promoters on the social network. This data is represented by our system in such a way that it can be easily accessed by users who are viewing it. In addition, a link to the data being represented (artist, album, song, etc.) is provided so that it is quickly accessible. If you want to obtain more information about the data being displayed, you can access ",
                        here: "here",
                        exp2part2: " If you want to know how to get a Spotify ID, the steps to follow can be found ",
                        subtitle3: "Autor",
                        exp3: "The author of this social network is Hugo Gutiérrez Tomás, as previously mentioned, as a final degree project in Software Engineering at the University of Oviedo. In case you want to contact him, his corporate email of the University of Oviedo is provided at the bottom."
                    },
                    register:{
                        title: "Registration",
                        tab1: "Data",
                        tab2: "About you",
                        tab3: "Summary",
                        name: "User name",
                        country: "Country of birth",
                        countryLabel: "Select your country",
                        location: "Location",
                        date: "Date of birth",
                        password: "Password",
                        confPassword: "Repeat password",
                        typeUser: "Profile type",
                        genre: "Favourite genre",
                        social: "Add links to your social networks!",
                        description: "Enter a short description about yourself",
                        photo: "Add a profile picture (optional):",
                        login: "Already have an account, log in by clicking ",
                        idSpo: "See how to get your Spotify ID ",
                        artist: "Artist",
                        promoter: "Promoter",
                        standard: "Stardard",
                        other: "Other",
                        errorTip: "Choose a user type.",
                        errorMul: "The profile picture must have the extension png or jpg (if not changed the profile will be created without a picture)",
                        errorNoMul: "User created, photo could not be inserted",
                        errorName: "The name is already in use",
                        errorRobot: "Please confirm that you are not a robot 🤖"
                    },
                    find: {
                        follow: "Follow users",
                        findUsers: "Users who follow you",
                        searchUsersTextField: "Search users",
                        searchUsers: "Users found:",
                        artists: "User type",
                        country: "Country",
                        age: "Age range",
                        genre: "Genre"
                    },
                    login: {
                        title: "Login",
                        register: "If you don't have an account, create one now by clicking ",
                        numFallos: "You have exceeded your login attempt limit. Please try again later.",
                        fieldError: "Some field is empty",
                        xssError: "The password or user includes some impermissible character",
                        badCred: "The credentials are not correct"
                    },
                    logout:{
                        title: "Session closed",
                        subTitle: "Thank you for using our social network, we hope to see you back soon!",
                    },
                    edit:{
                        title: "Edit profile",
                        description: "Description",
                        return: "Don't want to update your profile, go back by pressing "
                    },
                    profile:{
                        title: "Edit",
                        spotify: "Spotify Profile",
                        delete: "Confirm deletion",
                        deleteText: "Are you sure you want to delete your profile picture? A new profile picture will be applied to your profile picture and you can choose your picture again by editing your username"
                    },
                    publication: {
                        like: "Like",
                        newComment: "Add comment",
                        comments: "View comments",
                        comment: "Comments:",
                        newCom: "Add comment",
                        comWar: "Attention: The comment will be public to everyone who can view the post.",
                        comText: "Comment text"
                    },
                    stats:{
                        title: "Statistics",
                        subtitle: "Check your statistics based on the people who follow you!",
                        age: "Statistics by age",
                        country: "Statistics by country",
                        genre: "Statistics by gender",
                        ageLabel: "Percentage (%) by age range",
                        genreLabel: "Percentages (%) by preferred gender",
                        middleAge: "The average age of your followers is ",
                        ageText: " years old",
                        ageRange: "What are the age ranges?",
                        young: "Young: Between 16 and 30 years old.",
                        adult: "Adults: Between 31 and 65",
                        senior: "Seniors: Between 65 and 150 years old",
                        countryTable: "Country",
                        percentageTable: "Percentage"
                    },
                    externProfile: {
                        photo: "Photo",
                        pubs: "Publications",
                        seg: "Followers",
                        follows: "Followed",
                        genre: "Favourite genre",
                        Other: "Other",
                        pubType: "Type of post", 
                        pubOrd: "Sort by",
                        social: "Other social networks"
                    },
                    spoData: {
                        title: "Data extracted from Spotify",
                        about: "About ",
                        album: "His best albums:",
                        songs: "His best songs:",
                        ifLike: "If you like ",
                        ifLike2: " you might also like:"
                    },
                    spoCards: {
                        date: "Release date: ",
                        num: "Number of songs: ",
                        artists: "Artists participating: ",
                        albumLink: "View album on Spotify",
                        pop: "Popularity: ",
                        seg: "Followers: ",
                        genres: "Genres: ",
                        artistLink: "View profile on Spotify",
                        albumSong: "Album to which it belongs: ",
                        dur: "Duration: ",
                        ext: "Excerpt from the song:",
                        songLink: "View song on Spotify",
                    },
                    comments: {
                        resp: "In reply to ",
                        text: "Reply",
                        delete: "Do you want to delete this comment?",
                        deleteText: "The comment will be deleted and you will not be able to undo this action."
                    },
                    pubCard: {
                        title: "Confirm deletion",
                        text: "The post, along with its likes and comments, will be removed from the system."
                    },
                    regCard: {
                        title1: "Personal data:",
                        name: "Name*: ",
                        country: "Nationality*: ",
                        location: "Location: ",
                        title2: "Profile data:",
                        userType: "User type: ",
                        description: "Description: ",
                        spoID: "Spotify profile: "
                    },
                    userCard: {
                        Artista: "Artist",
                        Promotor: "Promoter",
                        Estándar: "Stardard",
                        artista: "Artist",
                        promotor: "Promoter",
                        estándar: "Stardard",
                        FreeStyle: "FreeStyle",
                        Pop: "Pop",
                        Rock: "Rock",
                        Rap: "Rap",
                        Trap: "Trap",
                        Otro: "Other"
                    },
                    rgpd: {
                        conditions: "Accept conditions for data processing",
                        title: "By registering you accept the following conditions",
                        cond1: "Your personal data may be used for the representation of statistics to other users (such as country of birth, age, etc.)",
                        cond2: "In case you wish to delete your account, your personal data will be removed from the database (they may remain in a database for backup purposes)",
                        cond3: "Your personal data will remain in the database until such time as you decide to remove it from the database",
                        cond4: "Your personal data will not be sent to other companies",
                    },
                    button: {
                        home: "Home page",
                        login: "Login",
                        register: 'Register',
                        find: "Find",
                        filters: "Filters",
                        newPub: "Create publication",
                        next: "Next",
                        reload: "Reload initial dates",
                        updateProfile: "Upload profile",
                        apFilters: "Apply filters",
                        cancel: "Cancel",
                        publish: "Publish",
                        edit: "Edit",
                        delete: "Delete",
                        deletePhoto: "Delete profile pic",
                        confirm: "Confirm",
                        age: "Age ranges",
                        editProf: "Edit profile",
                        spoStats: "Spotify stats",
                        comment: "Comment",
                        details: "Details",
                        rgpd: "See conditions",
                        close: "Close",
                        credentials: "Login"
                    },
                    footer: {
                        text1: "Done by Hugo Gutiérrez Tomás.",
                        text2: "Contact e-mail: UO277891@uniovi.es"
                    },
                    fallos: {
                        noIdent: "Please log in to access this page",
                        pub: "Publication not available",
                        load: "Loading...",
                        noSeg: "You have no followers to show your stats",
                        noUsu: "User not found",
                        noSpo: "Could not load Spotify data"
                    }
                }
            },
            es: {
                translation: {
                    home: {
                        welcom1: "¡Bienvenido a ",
                        welcom2: ', la red social enfocada al mundo del freestyle!',
                        pubs: 'Últimas publicaciones',
                    },
                    navBar: {
                        follow: "Siguiendo",
                        follows: 'Tus seguidores',
                        find: "Buscar usuarios",
                        newPub: "Crear publicación",
                        about: "Sobre SocialFS",
                        idSpo: "Obtener ID Spotify",
                        dataSpo: "Datos de Spotify",
                        acount: "Cuenta",
                        profile: "Perfil",
                        stats: "Estadísticas",
                        logout: "Cerrar sesión",
                        delete: "Eliminar cuenta",
                        deleteTitle: "Eliminación de cuenta",
                        deleteSubtitle: "¿Está seguro de eliminar su cuenta?, su usuario, junto con sus publicaciones y comentarios serán eliminados permanentemente.",
                    },
                    find: {
                        follow: "Usuarios a los que sigues",
                        findUsers: "Usuarios que te siguen",
                        searchUsersTextField: "Buscar usuarios",
                        searchUsers: "Usuarios encontrados:",
                        artists: "Tipo de usuario",
                        country: "País",
                        age: "Rango edad",
                        genre: "Género"
                    },
                    newPub: {
                        title: "Nueva publicación",
                        text: "Introduce el texto de la publicación",
                        photo: "¡Añade una foto o un audio a tu publicación!",
                        errorDes0: "Se debe escribir algo en el texto para crear la publicación.",
                        errorDes200: "El texto debe tener como máximo 200 caracteres.",
                        errorDesInv: "Se ha detectado texto inválido, modifíquelo por favor.",
                        errorMulTam: "La multimedia no puede ser superior a 1 MB (si no lo cambia la publicación se creará sin multimedia)",
                        errorMulExt: "La multimedia debe tener extensión png, jpg o mp3 (si no lo cambia la publicación se creará sin multimedia)",
                        errorNoMul: "La publicación se ha creado, pero la multimedia no ha podido ser añadida.",
                        errorNoPub: "Ha ocurrido un error, la publicación no ha podido ser creada."
                    },
                    idSpo: {
                        title: "Cómo obtener tu ID de Spotify",
                        step1: "Entra en tu perfil de spotify",
                        step2: "Copia el código que aparece en la URL de la página",
                        step3: "¡Listo, ya tienes tu ID de Spotify!"
                    },
                    dataSpo: {
                        title: "Qué datos se extraen de Spotify",
                        subtitle: "Una vez nos proporciones tu ID de Spotify, a través de la API se sacarán los siguientes datos:",
                        artTit: "Sobre ti",
                        artImg: "Imagen de perfil.",
                        artGen: "Géneros con los que se te relaciona.",
                        artPop: "Popularidad en Spotify.",
                        artSeg: "Número de seguidores.",
                        artLink: "Enlace a tu perfil de Spotify.",
                        albTit: "Tus 6 álbumes más populares",
                        albImg: "Imagen del álbum.",
                        albFec: "Fecha de lanzamiento.",
                        albNum: "Número de canciones.",
                        albArt: "Artistas.",
                        albLink: "Enlace al álbum.",
                        sonTit: "Tus 6 canciones más populares",
                        sonImg: "Imagen del álbum o canción.",
                        sonAlb: "Álbum al que pertenece.",
                        sonFec: "Fecha de salida.",
                        sonArt: "Artistas que participan.",
                        sonPup: "Popularidad en la plataforma.",
                        sonDur: "Duración.",
                        sonExt: "Extracto de la canción.",
                        sonLink: "Enlace a la canción.",
                        simTit: "12 artistas similares a ti (según Spotify)",
                        simSubTit: "Mismos datos que se muestran para tu perfil."
                    },
                    about:{
                        title: "Sobre Social FS",
                        subtitle1: "Motivación",
                        exp1: 'SocialFS nace como un proyecto de fin de grado. Su finalidad principal es permitir que los "freestylers" puedan compartir fácilmente contenidos sobre sus proyectos y los promotores de eventos puedan compartir fechas y novedades de los mismos. Pese a estar pensada para artistas del mundo del Freestyle, cualquier artista, principalmente del género musical, podrá usar este sistema, pues su conexión con Spotidy es válida para cualquier artista.',
                        subtitle2: "Conexión con Spotify",
                        exp2part1: "Spotify proporciona datos sobre los artistas y promotores de la red social. Estos datos son representados por nuestro sistema de forma que los usuarios que los estén visualizando puedan acceder a ellos fácilmente. Además, se proporciona un enlace al dato que se está representado (artista, álbum, canción, etc.) de forma que sea accesible de forma rápida. Si se quiere obtener más información sobre los datos que se visualizan se puede acceder ",
                        here: "aquí",
                        exp2part2: " Si se desea saber cómo obtener un ID de Spotify, los pasos a seguir se pueden ver ",
                        subtitle3: "Autor",
                        exp3: "El autor de esta red social es Hugo Gutiérrez Tomás, realizado, como antes se ha dicho, como trabajo fin de grado en la carrera Ingeniería del Software en la Universidad de Oviedo. En caso de querer contactar con él, se propociona su correo electrónico corporativo de la Universidad de Oviedo en la parte inferior."
                    },
                    register:{
                        title: "Registro",
                        tab1: "Datos",
                        tab2: "Sobre ti",
                        tab3: "Resumen",
                        name: "Nombre de usuario",
                        country: "País de nacimiento",
                        countryLabel: "Selecciona tu país",
                        location: "Localidad",
                        date: "Fecha de nacimiento",
                        password: "Contraseña",
                        confPassword: "Repetir contraseña",
                        typeUser: "Tipo de perfil",
                        genre: "Género favorito",
                        social: "¡Añade enlaces a tus redes sociales!",
                        description: "Introduce una pequeña descripción sobre ti",
                        photo: "Añade una foto de perfil (opcional):",
                        login: "¿Ya tienes cuenta?, ¡inicia sesión pulsando ",
                        idSpo: "Consulta cómo obtener tu ID de Spotify ",
                        artist: "Artista",
                        promoter: "Promotor",
                        standard: "Estándar",
                        other: "Otro",
                        errorTip: "Elija un tipo de usuario.",
                        errorMul: "La foto de perfil debe tener la extensión png o jpg (si no lo cambia el perfil se creará sin foto)",
                        errorNoMul: "Usuario creado, la foto no ha podido ser insertada",
                        errorName: "El nombre ya está en uso",
                        errorRobot: "Confirme que no es un robot por favor 🤖"
                    },
                    login: {
                        title: "Iniciar Sesión",
                        register: "Si no tienes cuenta, ¡crea una ahora pulsando ",
                        numFallos: "Ha superado el límite de intentos para iniciar sesión. Inténtelo de nuevo más tarde.",
                        fieldError: "Algún campo está vacío",
                        xssError: "La contraseña o el usuario incluye algún caractér no permitido",
                        badCred: "Las credenciales no son correctas"
                    },
                    logout:{
                        title: "Sesión finalizada",
                        subTitle: "Gracias por usar nuestra red social. ¡Te esperamos de vuelta pronto!",
                    },
                    edit:{
                        title: "Editar perfil",
                        description: "Descripción",
                        return: "¿No quieres actualizar tu perfil?, vuelve atrás pulsando "
                    },
                    profile:{
                        title: "Editar",
                        spotify: "Perfil de Spotify: ",
                        delete: "Confirmar eliminación",
                        deleteText: "¿Está seguro de eliminar su foto de perfil? Se le aplicará una foto de perfil determinada y podrá volver a elegir su foto editando su usuario"
                    },
                    publication: {
                        like: "Me gusta",
                        newComment: "Añadir comentario",
                        comments: "Ver comentarios",
                        comment: "Comentarios:",
                        newCom: "Añadir comentario",
                        comWar: "Atención: El comentario será público para todas las personas que puedan visualizar la publicación.",
                        comText: "Texto para comentar"
                    },
                    stats:{
                        title: "Estadísticas",
                        subtitle: "¡Consulta tus estadísticas en base a las personas que te siguen!",
                        age: "Estadísticas por edad",
                        country: "Estadísticas por país",
                        genre: "Estadísticas por género",
                        ageLabel: "Porcentajes (%) por rango de edad",
                        genreLabel: "Porcentajes (%) por género favorito",
                        middleAge: "La media de edad de tus seguidores es de ",
                        ageText: " años.",
                        ageRange: "¿Cuáles son los rangos de edad?",
                        young: "Jóvenes: Entre 16 y 30 años.",
                        adult: "Adultos: Entre 31 y 65 años.",
                        senior: "Mayores: Entre 65 y 150 años.",
                        countryTable: "País",
                        percentageTable: "Porcentaje"
                    },
                    externProfile: {
                        photo: "Foto",
                        pubs: "Publicaciones",
                        seg: "Seguidores",
                        follows: "Seguidos",
                        genre: "Género favorito",
                        Otro: "Otro",
                        pubType: "Tipo publicación",
                        pubOrd: "Ordenar por",
                        social: "  Otras redes sociales"
                    },
                    spoData: {
                        title: "Datos extraídos de Spotify",
                        about: "Sobre ",
                        album: "Sus mejores álbumes:",
                        songs: "Sus mejores canciones:",
                        ifLike: "Si te gusta ",
                        ifLike2: " también podría gustarte:"
                    },
                    spoCards: {
                        date: "Fecha de lanzamiento: ",
                        num: "Número de canciones: ",
                        artists: "Artistas que participan: ",
                        albumLink: "Ver álbum en Spotify",
                        pop: "Popularidad: ",
                        seg: "Seguidores: ",
                        genres: "Géneros: ",
                        artistLink: "Ver perfil en Spotify",
                        albumSong: "Álbum al que pertenece: ",
                        dur: "Duración: ",
                        ext: "Extracto de la canción:",
                        songLink: "Ver canción en Spotify",
                    },
                    comments: {
                        resp: "En respuesta a ",
                        text: "Responder",
                        delete: "¿Desea eliminar este comentario?",
                        deleteText: "El comentario será eliminado y no podrá deshacer esta acción."
                    },
                    pubCard: {
                        title: "Confirmar eliminación",
                        text: "La publicación, junto con sus me gusta y comentarios, será eliminada del sistema."
                    },
                    regCard: {
                        title1: "Datos personales:",
                        name: "Nombre*: ",
                        country: "Nacionalidad*: ",
                        location: "Localidad: ",
                        title2: "Datos del perfil:",
                        userType: "Tipo de usuario: ",
                        description: "Descripción: ",
                        spoID: "Perfil de Spotify: "
                    },
                    userCard: {
                        Artista: "Artista",
                        Promotor: "Promotor",
                        Estándar: "Estándar",
                        artista: "Artista",
                        promotor: "Promotor",
                        estándar: "Estándar",
                        FreeStyle: "FreeStyle",
                        Pop: "Pop",
                        Rock: "Rock",
                        Rap: "Rap",
                        Trap: "Trap",
                        Otro: "Otro"
                    },
                    rgpd: {
                        conditions: "Aceptar condiciones para tratamiento de datos",
                        title: "Al registrarse usted acepta las siguientes condiciones",
                        cond1: "Sus datos personales podrán ser utilizados para la representación de estadísticas a otros usuarios (tales como el país de nacimiento, edad, etc.).",
                        cond2: "En caso de que desee eliminar su cuenta, sus datos personales serán eliminados de la base de datos (pueden quedar en alguna base de datos para copias de seguridad).",
                        cond3: "Sus datos personales estarán en la base de datos hasta el momento en que usted decida eliminarlos de la base de datos.",
                        cond4: "Sus datos personales no serán enviados a otras empresas.",
                    },
                    button: {
                        home: "Página de inicio",
                        login: "Iniciar Sesión",
                        register: 'Registrarse',
                        find: "Buscar",
                        filters: "Filtros",
                        newPub: "Crear publicación",
                        next: "Siguiente",
                        reload: "Recargar datos iniciales",
                        updateProfile: "Actualizar perfil",
                        apFilters: "Aplicar filtros",
                        cancel: "Cancelar",
                        publish: "Publicar",
                        edit: "Editar",
                        delete: "Eliminar",
                        deletePhoto: "Eliminar foto de perfil",
                        confirm: "Confirmar",
                        age: "Rangos de edad",
                        editProf: "Editar perfil",
                        spoStats: "Estadísticas Spotify",
                        comment: "Comentar",
                        details: "Detalles",
                        rgpd: "Consultar condiciones",
                        close: "Cerrar",
                        credentials: "Comprobar credenciales"
                    },
                    footer: {
                        text1: "Hecho por Hugo Gutiérrez Tomás.",
                        text2: "Correo de contacto: UO277891@uniovi.es"
                    },
                    fallos: {
                        noIdent: "Inicia sesión para acceder a esta página",
                        pub: "Publicación no disponible",
                        load: "Cargando...",
                        noSeg: "No tienes seguidores para mostrar tus estadísticas",
                        noUsu: "Usuario no encontrado.",
                        noSpo: "No hemos podido cargar los datos de Spotify",
                        noCom: "No hemos podido cargar los datos de Spotify"
                    }
                }
            }
        }
    });

export default i18n;