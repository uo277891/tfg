const mongoose = require('mongoose')

const DB_URI = "mongodb+srv://hugo:unSBtvm4aiJK1WJb@cluster0.bsnmdtu.mongodb.net/socialfs?retryWrites=true&w=majority"

module.exports = () =>{
    const connect = () =>{
        mongoose.connect(
            DB_URI,
            (error: Error) =>{
                if(error){
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