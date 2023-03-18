const mongoose = require('mongoose')

const DB_URI = "mongodb+srv://hugo:unSBtvm4aiJK1WJb@cluster0.bsnmdtu.mongodb.net/socialfs?retryWrites=true&w=majority"

const DB_URI_OLD = "mongodb://hugo:unSBtvm4aiJK1WJb@ac-v3ngssk-shard-00-00.bsnmdtu.mongodb.net:27017,ac-v3ngssk-shard-00-01.bsnmdtu.mongodb.net:27017,ac-v3ngssk-shard-00-02.bsnmdtu.mongodb.net:27017/socialfs?ssl=true&replicaSet=atlas-h4ine2-shard-0&authSource=admin&retryWrites=true&w=majority"

module.exports = () =>{
    const connect = () =>{
        mongoose.connect(
            DB_URI_OLD,
            (error: Error) =>{
                if(error){
                    console.log("Error :( " + error)
                }
                else{
                    console.log("Conexión establecida :D")
                }
            }
        )
    }

    connect();
}