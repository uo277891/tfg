import { Application } from "express"
import request, { Response } from 'supertest';

const cors = require('cors')
const express = require('express')
const base = require('./config/db')
const bodyParser = require('body-parser')

let app:Application;

const port = 5000

const usuarioRoute = require('./routes/usuarioRoute')
const publicacionRoute = require('./routes/publicationRoute')
const seguidorRoute = require('./routes/seguidorRoute')
const cloudinaryRoute = require('./routes/cloudinaryRoutes')
const comentarioRoute = require('./routes/comentarioRoutes')
const spotifyRoute = require('./routes/spotifyRouters')

app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(usuarioRoute)
app.use(publicacionRoute)
app.use(seguidorRoute)
app.use(cloudinaryRoute)
app.use(comentarioRoute)
app.use(spotifyRoute)

app.listen(port, () => {
    console.log("Aplicación en línea")
})

base.connect()

describe('usuarios ', () => {
    it('Búsqueda por nombre', async () => {
        const response: Response = await request(app).get("/usuario/getusuario/name/usuario1");
        expect(response.text).not.toEqual('[]')
        expect(response.statusCode).toBe(200);
    });
})