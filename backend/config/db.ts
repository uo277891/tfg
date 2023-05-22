const mongoose = require('mongoose')
const dotenv = require('dotenv').config();

const DB_URI = process.env.URI_MONGO

const DB_URI_OLD = process.env.URI_MONGO_ANTIGUA

const DB_URI_OLD_TEST = process.env.URI_MONGO_ANTIGUA_TEST

const connect = () =>{
    mongoose.connect(
        DB_URI_OLD_TEST,
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

const disconnect = async () => {
    mongoose.connection.close();
}

module.exports = {
    connect: connect,
    disconnect: disconnect
}