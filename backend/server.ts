const express = require('express')
const initdb = require('./config/db')
const app = express()

const port = 5000

const pruebaRoute = require('./routes/prueba')

app.use(pruebaRoute)

app.listen(port, () => {
    console.log("Aplicación en línea")
})

initdb()