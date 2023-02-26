import { Application } from "express"

const cors = require('cors')
const express = require('express')
const initdb = require('./config/db')
const bodyParser = require('body-parser')
//const cookieSesion = require("cookie-session")

const app:Application = express()

const port = 5000

const usuarioRoute = require('./routes/usuarioRoute')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(usuarioRoute)
//app.use(cookieSesion({name: "sesion-inicio", secret: process.env.SECRET, httpOnly: true}))

app.listen(port, () => {
    console.log("Aplicación en línea")
})

initdb()