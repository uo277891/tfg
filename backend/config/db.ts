const mongoose = require('mongoose')
const dotenv = require('dotenv').config();

const DB_URI = process.env.URI_MONGO

const DB_URI_OLD = process.env.URI_MONGO_ANTIGUA

const DB_URI_OLD_TEST = process.env.URI_MONGO_ANTIGUA_TEST

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

const connectTest = () =>{
    mongoose.connect(
        "mongodb://hugo:unSBtvm4aiJK1WJb@ac-v3ngssk-shard-00-00.bsnmdtu.mongodb.net:27017,ac-v3ngssk-shard-00-01.bsnmdtu.mongodb.net:27017,ac-v3ngssk-shard-00-02.bsnmdtu.mongodb.net:27017/tests?ssl=true&replicaSet=atlas-h4ine2-shard-0&authSource=admin&retryWrites=true&w=majority",
        (error: Error) =>{
            if(error){
                console.log("Error :( " + error)
            }
        }
    )
}

const disconnect = async () => {
    mongoose.connection.close();
}

module.exports = {
    connect: connect,
    connectTest: connectTest,
    disconnect: disconnect
}