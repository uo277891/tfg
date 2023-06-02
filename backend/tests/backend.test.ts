import { Application } from 'express';
import * as http from 'http';

const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const request = require('supertest')

const usuarioRoute = require('../routes/usuarioRoute')
const publicacionRoute = require('../routes/publicationRoute')
const seguidorRoute = require('../routes/seguidorRoute')
const cloudinaryRoute = require('../routes/cloudinaryRoutes')
const comentarioRoute = require('../routes/comentarioRoutes')
const spotifyRoute = require('../routes/spotifyRouters')

const bd = require('../config/db')

let app: Application;
let server: http.Server;
require('dotenv');

beforeAll(async () => {
    app = express();
    const port: number = 5000;

    app.use(cors());
    app.use(bodyParser.json());

    app.use(usuarioRoute);
    app.use(publicacionRoute);
    app.use(seguidorRoute);
    app.use(cloudinaryRoute);
    app.use(comentarioRoute);
    app.use(spotifyRoute);

    server = app.listen(port, (): void => {
    }).on("error", (error: Error) => {
        console.error('Error occured: ' + error.message);
    });

    bd.connectTest();
});

afterAll(async () => {
    server.close();
    bd.disconnect();
});

describe('Pruebas para los usuarios ', () => {
    it('Búsqueda por ID', async () => {
        const response = await request(app).get("/usuario/getusuario/646a47025e73d6bf56559576");
        expect(response.text).not.toEqual('[]')
        expect(response.statusCode).toBe(200);
    });
    it('Búsqueda por nombre específica', async () => {
        const response = await request(app).get("/usuario/getusuario/name/usuario1");
        expect(response.text).not.toEqual('[]')
        expect(response.statusCode).toBe(200);
    });
    it('Búsqueda por nombre e ID', async () => {
        const response = await request(app).get("/usuario/getusuarios/filter/646a47025e73d6bf56559576/usu");
        expect(response.text).not.toEqual('[]')
        expect(response.statusCode).toBe(200);
    });
    it('Búsqueda por IDs', async () => {
        const response = await request(app).get("/usuario/getusuarios/646a47025e73d6bf56559576,646a47ba5e73d6bf5655958f");
        expect(response.text).toEqual('{"users":[{"_id":"646a47025e73d6bf56559576","nombre":"usuario2","contrasena":"$2a$10$usdGWIhs3at3HtaNkVXqL.XF2aUMwZWbva9GLCoRA5SpfkpUGQiKm","pais":"España","localidad":"Gijon","fecha_nac":"1976-05-21T16:29:09.827Z","nombre_spotify":"","enlace_foto":"https://res.cloudinary.com/ddtcz5fqr/image/upload/v1679309731/perfiles/default_user_image_a8y5kc","descripcion":"descripcion usuario 2","tipo":"Promotor","genero":"Pop","redes":["","",""],"__v":0},{"_id":"646a47ba5e73d6bf5655958f","nombre":"usuario4","contrasena":"$2a$10$Nv3P.HTuqj1X11gEHvoueuhn6gdq7qXYz9XmNLt00RMnHhGHiS44u","pais":"Colombia","localidad":"","fecha_nac":"2007-05-21T16:31:09.454Z","nombre_spotify":"7ltDVBr6mKbRvohxheJ9h1","enlace_foto":"https://res.cloudinary.com/ddtcz5fqr/image/upload/v1679309731/perfiles/default_user_image_a8y5kc","descripcion":"","tipo":"Artista","genero":"Trap","redes":["","",""],"__v":0}]}')
        expect(response.statusCode).toBe(200);
    });
    it('Búsqueda por pais', async () => {
        const response = await request(app).get("/usuario/getusuario/country/Colombia");
        expect(response.text).toEqual('{"users":[{"_id":"646a47ba5e73d6bf5655958f","nombre":"usuario4","contrasena":"$2a$10$Nv3P.HTuqj1X11gEHvoueuhn6gdq7qXYz9XmNLt00RMnHhGHiS44u","pais":"Colombia","localidad":"","fecha_nac":"2007-05-21T16:31:09.454Z","nombre_spotify":"7ltDVBr6mKbRvohxheJ9h1","enlace_foto":"https://res.cloudinary.com/ddtcz5fqr/image/upload/v1679309731/perfiles/default_user_image_a8y5kc","descripcion":"","tipo":"Artista","genero":"Trap","redes":["","",""],"__v":0}]}')
        expect(response.statusCode).toBe(200);
    });
    it('Búsqueda por tipo de usuario', async () => {
        const response = await request(app).get("/usuario/getusuario/tipo/Promotor");
        expect(response.text).toEqual('{"users":[{"_id":"646a47025e73d6bf56559576","nombre":"usuario2","contrasena":"$2a$10$usdGWIhs3at3HtaNkVXqL.XF2aUMwZWbva9GLCoRA5SpfkpUGQiKm","pais":"España","localidad":"Gijon","fecha_nac":"1976-05-21T16:29:09.827Z","nombre_spotify":"","enlace_foto":"https://res.cloudinary.com/ddtcz5fqr/image/upload/v1679309731/perfiles/default_user_image_a8y5kc","descripcion":"descripcion usuario 2","tipo":"Promotor","genero":"Pop","redes":["","",""],"__v":0}]}')
        expect(response.statusCode).toBe(200);
    });
    it('Búsqueda por género favorito', async () => {
        const response = await request(app).get("/usuario/getusuario/genero/Otro");
        expect(response.text).toEqual('{"users":[{"_id":"646a47415e73d6bf56559584","nombre":"usuario3","contrasena":"$2a$10$0TyTEI/EgRa5JBoFUV3sQe4GDa9HXHMFnMj.UKOn4NyuFdrQ2jjKq","pais":"Argentina","localidad":"Gijon","fecha_nac":"1945-05-21T16:30:12.987Z","nombre_spotify":"","enlace_foto":"https://res.cloudinary.com/ddtcz5fqr/image/upload/v1679309731/perfiles/default_user_image_a8y5kc","descripcion":"descripcion usuario 3","tipo":"Estándar","genero":"Otro","redes":["","",""],"__v":0}]}')
        expect(response.statusCode).toBe(200);
    });
    it('Búsqueda entre dos fechas', async () => {
        const response = await request(app).get("/usuario/getusuario/fecha/2005/1970");
        expect(response.text).toEqual('{"users":[{"_id":"646a46a95e73d6bf5655955f","nombre":"usuario1","contrasena":"$2a$10$sCpp/RtjZvBU2U1OT8fvaeLRAsCRsEQEfI3VArX/RImtsvfYwdrJq","pais":"España","localidad":"Gijon","fecha_nac":"2000-05-21T16:27:36.132Z","nombre_spotify":"","enlace_foto":"https://res.cloudinary.com/ddtcz5fqr/image/upload/v1679309731/perfiles/default_user_image_a8y5kc","descripcion":"descripcion usuario 1","tipo":"Artista","genero":"FreeStyle","redes":["","",""],"__v":0},{"_id":"646a47025e73d6bf56559576","nombre":"usuario2","contrasena":"$2a$10$usdGWIhs3at3HtaNkVXqL.XF2aUMwZWbva9GLCoRA5SpfkpUGQiKm","pais":"España","localidad":"Gijon","fecha_nac":"1976-05-21T16:29:09.827Z","nombre_spotify":"","enlace_foto":"https://res.cloudinary.com/ddtcz5fqr/image/upload/v1679309731/perfiles/default_user_image_a8y5kc","descripcion":"descripcion usuario 2","tipo":"Promotor","genero":"Pop","redes":["","",""],"__v":0}]}')
        expect(response.statusCode).toBe(200);
    });
    it('Búsqueda por nombre', async () => {
        const response = await request(app).get("/usuario/find/usu");
        expect(response.text).not.toEqual('[]')
        expect(response.statusCode).toBe(200);
    });
    it('Búsqueda por ID entre dos fechas', async () => {
        const response = await request(app).get("/usuario/getusuario/id/fecha/646a47415e73d6bf56559584/2000/2001");
        expect(response.text).toEqual('{"users":[]}')  
        expect(response.statusCode).toBe(200);
    });
    it('Insertar un usuario', async () => {
        let usuario = { "nombre": "usuario5", "contraseña": "contrasenaPrueba", "pais":"España", "localidad":"Gijon", "fecha_nac":"2000-05-21T16:27:36.132Z", "nombre_spotify":"", "enlace_foto":"", "descripcion":"descripcion usuario 5","tipo":"Artista", "genero":"FreeStyle", "redes":["","",""]}
        let response = await request(app).post('/usuario/register').send(usuario).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);

        //intentamos insertar un usuario con el mismo nombre
        response = await request(app).post('/usuario/register').send(usuario).set('Accept', 'application/json');
        expect(response.statusCode).toBe(400);
    });
    it('Comprobar credenciales de un usuario', async () => {
        //Nombre que no existe
        let usuario = { "nombre": "usuarioInvalido", "contraseña": "contrasenaPrueba"}
        let response = await request(app).post('/usuario/login').send(usuario).set('Accept', 'application/json');
        expect(response.statusCode).toBe(400);

        //Dupla nombre y contraseña incorrectas
        usuario = { "nombre": "usuario5", "contraseña": "contrasenaIncorrecta"}
        response = await request(app).post('/usuario/login').send(usuario).set('Accept', 'application/json');
        expect(response.statusCode).toBe(400);

        //Inicio de sesión correcto
        usuario = { "nombre": "usuario5", "contraseña": "contrasenaPrueba"}
        response = await request(app).post('/usuario/login').send(usuario).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });
    it('Actualizar un usuario', async () => {
        let usuario = { "nombre": "usuarioNombreModificado", "pais":"España", "localidad":"Gijon", "fecha_nac":"1952-05-21T16:27:36.132Z", "nombre_spotify":"", "enlace_foto":"", "descripcion":"descripcion usuario 5","tipo":"Artista", "genero":"FreeStyle", "redes":["","",""]}
        let response = await request(app).put('/usuario/profile/edit/usuario5').send(usuario).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
        let usuario2 = { "pais":"Chile", "localidad":"Gijon", "fecha_nac":"1952-05-21T16:27:36.132Z", "nombre_spotify":"", "enlace_foto":"", "descripcion":"descripcion usuario 5","tipo":"Artista", "genero":"FreeStyle", "redes":["","",""]}
        response = await request(app).put('/usuario/edit/usuarioNombreModificado').send(usuario2).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);

        //Comprobación del cambio
        response = await request(app).get("/usuario/getusuario/country/Chile");
        expect(response.text).not.toEqual('[]')
        expect(response.statusCode).toBe(200);

    });
    it('Eliminar un usuario', async () => {
        let response = await request(app).get("/usuario/getusuario/name/usuarioNombreModificado");
        const idUser = response._body.user._id
        const body = {idUser}
        response = await request(app).delete("/usuario/delete/").send(body).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });
})

describe('Pruebas para las publicaciones ', () => {
    it('Búsqueda por ID', async () => {
        const response = await request(app).get("/publicaciones/getpublicacion/646a485c5e73d6bf565595d7");
        expect(response.text).toEqual('{"publicacion":{"_id":"646a485c5e73d6bf565595d7","id_usuario":"646a46a95e73d6bf5655955f","texto":"publicacion 1","enlace_multimedia":"","tipo_multimedia":"txt","fecha":"2023-05-21T18:35:40.884Z","likes":["646a46a95e73d6bf5655955f","646a47025e73d6bf56559576","646a47415e73d6bf56559584"],"__v":0}}')
        expect(response.statusCode).toBe(200);
    });
    it('Búsqueda por usuario ordenado por fecha', async () => {
        const response = await request(app).get("/publicaciones/getpublicacion/646a46a95e73d6bf5655955f/fecha");
        expect(response.text).toEqual('{"publicaciones":[{"_id":"646a48645e73d6bf565595df","id_usuario":"646a46a95e73d6bf5655955f","texto":"publicacion 2","enlace_multimedia":"","tipo_multimedia":"txt","fecha":"2023-05-21T18:35:48.194Z","likes":[],"__v":0},{"_id":"646a485c5e73d6bf565595d7","id_usuario":"646a46a95e73d6bf5655955f","texto":"publicacion 1","enlace_multimedia":"","tipo_multimedia":"txt","fecha":"2023-05-21T18:35:40.884Z","likes":["646a46a95e73d6bf5655955f","646a47025e73d6bf56559576","646a47415e73d6bf56559584"],"__v":0}]}')
        expect(response.statusCode).toBe(200);
    });
    it('Búsqueda por usuario ordenado por likes', async () => {
        const response = await request(app).get("/publicaciones/getpublicacion/646a46a95e73d6bf5655955f/likes");
        expect(response.text).toEqual('{"publicaciones":[{"_id":"646a485c5e73d6bf565595d7","id_usuario":"646a46a95e73d6bf5655955f","texto":"publicacion 1","enlace_multimedia":"","tipo_multimedia":"txt","fecha":"2023-05-21T18:35:40.884Z","likes":["646a46a95e73d6bf5655955f","646a47025e73d6bf56559576","646a47415e73d6bf56559584"],"__v":0,"len":3},{"_id":"646a48645e73d6bf565595df","id_usuario":"646a46a95e73d6bf5655955f","texto":"publicacion 2","enlace_multimedia":"","tipo_multimedia":"txt","fecha":"2023-05-21T18:35:48.194Z","likes":[],"__v":0,"len":0}]}')
        expect(response.statusCode).toBe(200);
    });
    it('Búsqueda por usuario filtrado por tipo', async () => {
        let response = await request(app).get("/publicaciones/getpublicacion/tipo/646a46a95e73d6bf5655955f/txt/likes");
        expect(response.text).toEqual('{"publicaciones":[{"_id":"646a485c5e73d6bf565595d7","id_usuario":"646a46a95e73d6bf5655955f","texto":"publicacion 1","enlace_multimedia":"","tipo_multimedia":"txt","fecha":"2023-05-21T18:35:40.884Z","likes":["646a46a95e73d6bf5655955f","646a47025e73d6bf56559576","646a47415e73d6bf56559584"],"__v":0,"len":3},{"_id":"646a48645e73d6bf565595df","id_usuario":"646a46a95e73d6bf5655955f","texto":"publicacion 2","enlace_multimedia":"","tipo_multimedia":"txt","fecha":"2023-05-21T18:35:48.194Z","likes":[],"__v":0,"len":0}]}')
        expect(response.statusCode).toBe(200);

        response = await request(app).get("/publicaciones/getpublicacion/tipo/646a46a95e73d6bf5655955f/img/fecha");
        expect(response.text).toEqual('{"publicaciones":[]}')
        expect(response.statusCode).toBe(200);
    });
    it('Publicaciones con límite', async () => {
        const response = await request(app).get("/publicaciones/getpublicacionskip/1");
        expect(response.text).toEqual('{"publicaciones":[{"_id":"646a485c5e73d6bf565595d7","id_usuario":"646a46a95e73d6bf5655955f","texto":"publicacion 1","enlace_multimedia":"","tipo_multimedia":"txt","fecha":"2023-05-21T18:35:40.884Z","likes":["646a46a95e73d6bf5655955f","646a47025e73d6bf56559576","646a47415e73d6bf56559584"],"__v":0}]}')
        expect(response.statusCode).toBe(200);
    });
    it('Insertar una publicacion', async () => {
        let publicacion = { "id_usuario":"646a47025e73d6bf56559576","texto":"publicacion 3","enlace_multimedia":"","tipo_multimedia":"txt","fecha":"2023-05-21T18:35:40.884Z","likes":[]}
        let response = await request(app).post('/publicaciones/new').send(publicacion).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);

        response = await request(app).get("/publicaciones/getpublicacion/646a47025e73d6bf56559576/fecha");
        expect(response.text).not.toEqual('{"publicaciones":[]}')
        expect(response.statusCode).toBe(200);
    });
    it('Actualizar una publicacion', async () => {
        let publicacion = { "id_usuario":"646a47025e73d6bf56559576","texto":"publicacion modificada","enlace_multimedia":"","tipo_multimedia":"txt","fecha":"2023-05-21T18:35:40.884Z","likes":[]}
        let response = await request(app).get("/publicaciones/getpublicacion/646a47025e73d6bf56559576/fecha");
        const id = response._body.publicaciones[0]._id

        response = await request(app).put('/publicacion/update/' + id).send(publicacion).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });
    it('Eliminar una publicacion', async () => {
        let response = await request(app).get("/publicaciones/getpublicacion/646a47025e73d6bf56559576/fecha");
        const idPub = response._body.publicaciones[0]._id
        const idUser = "646a47025e73d6bf56559576"
        const body = {idPub, idUser}
        response = await request(app).delete("/publicacion/delete").send(body).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);

        response = await request(app).get("/publicaciones/getpublicacion/646a47025e73d6bf56559576/fecha");
        expect(response.text).toEqual('{"publicaciones":[]}')
        expect(response.statusCode).toBe(200);
    });
})

describe('Pruebas para los comentarios ', () => {
    it('Devolver comentarios de una publicación', async () => {
        const response = await request(app).get("/comentarios/getcomentarios/646a485c5e73d6bf565595d7");
        expect(response.text).not.toEqual('{"comentarios":[]}')
        expect(response.statusCode).toBe(200);
    });
    it('Devolver respuestas de un comentario', async () => {
        const response = await request(app).get("/comentarios/getcomentariosrespuesta/646a486f5e73d6bf565595ec");
        expect(response.text).not.toEqual('{"comentarios":[]}')
        expect(response.statusCode).toBe(200);
    });
    it('Insertar comentario', async () => {
        const comentario = {"id_publicacion":"646a46a95e73d6bf5655955f","id_usu_coment":"646a46a95e73d6bf5655955f","texto":"comentario 2","fecha":"2023-05-21T18:35:59.494Z"}
        let response = await request(app).post("/comentarios/new").send(comentario).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);

        response = await request(app).get("/comentarios/getcomentarios/646a46a95e73d6bf5655955f");
        expect(response.text).not.toEqual('{"comentarios":[]}')
        expect(response.statusCode).toBe(200);
    });
    it('Insertar respuesta', async () => {
        const comentario = {"id_publicacion":"646a46a95e73d6bf5655955f","id_usu_coment":"646a47025e73d6bf56559576","texto":"respuesta 2","fecha":"2023-05-21T18:38:25.603Z","id_comment":"646a486f5e73d6bf565595ec","id_usu_respond":"646a46a95e73d6bf5655955f"}
        let response = await request(app).post("/comentarios/respond/new").send(comentario).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);
    });
    it('Eliminar comentarios de una publicación', async () => {
        let response = await request(app).delete("/comentarios/eliminar/646a46a95e73d6bf5655955f");
        expect(response.statusCode).toBe(200);
        response = await request(app).get("/comentarios/getcomentarios/646a46a95e73d6bf5655955f");
        expect(response.text).toEqual('{"comentarios":[]}')
        expect(response.statusCode).toBe(200);
    });
})

describe('Pruebas para los seguidores ', () => {
    it('Devolver seguidores de un usuario', async () => {
        let response = await request(app).get("/seguidores/646a46a95e73d6bf5655955f");
        expect(response.text).not.toEqual('{"seguidores":[]}')
        expect(response.statusCode).toBe(200);
    });
    it('Devolver seguidos de un usuario', async () => {
        const response = await request(app).get("/seguidores/getSeguidores/646a47415e73d6bf56559584");
        expect(response.text).toEqual('{"followUsers":["646a47ba5e73d6bf5655958f"]}')
        expect(response.statusCode).toBe(200);
    });
    it('Seguir a un usuario', async () => {
        const seguir = {"idUser":"646a46a95e73d6bf5655955f","idSeg":"646a47ba5e73d6bf5655958f"}
        let response = await request(app).post("/seguidores/follow/").send(seguir).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);

        response = await request(app).get("/seguidores/getseguidos/646a46a95e73d6bf5655955f");
        expect(response.text).toEqual('{"followUsers":["646a47025e73d6bf56559576","646a47ba5e73d6bf5655958f"]}')
        expect(response.statusCode).toBe(200);
    });
    it('Dejar de seguir a un usuario', async () => {
        const seguir = {"idUser":"646a46a95e73d6bf5655955f","idSeg":"646a47ba5e73d6bf5655958f"}
        let response = await request(app).delete("/seguidores/unfollow/").send(seguir).set('Accept', 'application/json');
        expect(response.statusCode).toBe(200);

        response = await request(app).get("/seguidores/getseguidos/646a46a95e73d6bf5655955f");
        expect(response.text).toEqual('{"followUsers":["646a47025e73d6bf56559576"]}')
        expect(response.statusCode).toBe(200);
    });
    it('Comprobar si un usuario sigue a otro', async () => {
        let response = await request(app).get("/seguidores/isSeguidor/646a46a95e73d6bf5655955f/646a47ba5e73d6bf5655958f");
        expect(response.text).toEqual('{"isSeguidor":false}')
        expect(response.statusCode).toBe(200);

        response = await request(app).get("/seguidores/isSeguidor/646a47ba5e73d6bf5655958f/646a46a95e73d6bf5655955f");
        expect(response.text).toEqual('{"isSeguidor":true}')
        expect(response.statusCode).toBe(200);
    });

    describe('Eliminación de una cuenta ', () => {
        it('Se crea el usuario, con una publicación, un comentario y un seguimiento', async () => {
            let usuario = { "nombre": "usuario5", "contraseña": "contrasenaPrueba", "pais":"España", "localidad":"Gijon", "fecha_nac":"2000-05-21T16:27:36.132Z", "nombre_spotify":"", "enlace_foto":"", "descripcion":"descripcion usuario 5","tipo":"Artista", "genero":"FreeStyle", "redes":["","",""]}
            let response = await request(app).post('/usuario/register').send(usuario).set('Accept', 'application/json');
            expect(response.statusCode).toBe(200);

            response = await request(app).get("/usuario/getusuario/name/usuario5");
            const idUser = response._body.user._id
            console.log(idUser)

            let publicacion = { "id_usuario": idUser,"texto":"publicacion 3","enlace_multimedia":"","tipo_multimedia":"txt","fecha":"2023-05-21T18:35:40.884Z","likes":[]}
            response = await request(app).post('/publicaciones/new').send(publicacion).set('Accept', 'application/json');
            expect(response.statusCode).toBe(200);

            response = await request(app).get("/publicaciones/getpublicacion/" + idUser + "/fecha");
            expect(response.text).not.toEqual('{"publicaciones":[]}')
            expect(response.statusCode).toBe(200);

            const comentario = {"id_publicacion":"646a485c5e73d6bf565595d7", "id_usu_coment": idUser,"texto":"comentario 2","fecha":"2023-05-21T18:35:59.494Z"}
            response = await request(app).post("/comentarios/new").send(comentario).set('Accept', 'application/json');
            expect(response.statusCode).toBe(200);

            response = await request(app).get("/comentarios/getcomentarios/646a485c5e73d6bf565595d7");
            expect(response.text).not.toEqual('{"comentarios":[]}')
            expect(response.statusCode).toBe(200);

            const seguir = {"idUser":"646a47415e73d6bf56559584","idSeg": idUser}
            response = await request(app).post("/seguidores/follow/").send(seguir).set('Accept', 'application/json');
            expect(response.statusCode).toBe(200);
        });
        it('Se elimina todo', async () => {
            let response = await request(app).get("/usuario/getusuario/name/usuario5");
            const idUser = response._body.user._id
            const body = {idUser}
            response = await request(app).delete("/usuario/delete/").send(body).set('Accept', 'application/json');
            expect(response.statusCode).toBe(200);
            response = await request(app).delete("/publicacion/delete/usuario/").send(body).set('Accept', 'application/json');
            expect(response.statusCode).toBe(200);
            response = await request(app).delete("/seguidores/delete/all/").send(body).set('Accept', 'application/json');
            expect(response.statusCode).toBe(200);
            response = await request(app).delete("/usuario/delete/").send(body).set('Accept', 'application/json');
            expect(response.statusCode).toBe(200);
            response = await request(app).delete("/comentarios/eliminar/").send(body).set('Accept', 'application/json');
            expect(response.statusCode).toBe(200);

            response = await request(app).get("/usuario/getusuario/name/usuario5");
            expect(response.text).toEqual('"No hay usuario con ese nombre"')
            expect(response.statusCode).toBe(400);

            response = await request(app).get("/publicaciones/getpublicacion/" + idUser + "/fecha");
            expect(response.text).toEqual('{"publicaciones":[]}')
            expect(response.statusCode).toBe(200);

            response = await request(app).get("/comentarios/getcomentarios/" + idUser);
            expect(response.text).toEqual('{"comentarios":[]}')
            expect(response.statusCode).toBe(200);
        });
    })
})