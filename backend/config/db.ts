const mongoose = require('mongoose')

const DB_URI = "mongodb+srv://hugo:unSBtvm4aiJK1WJb@cluster0.bsnmdtu.mongodb.net/prueba?retryWrites=true&w=majority"

module.exports = () =>{
    const connect = () =>{
        mongoose.connect(
            DB_URI,
            {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            (error: undefined) =>{
                if(error === undefined){
                    console.log("Error :(")
                }
                else{
                    console.log("Conexión establecida :D")
                }
            }
        )
    }

    connect();
}