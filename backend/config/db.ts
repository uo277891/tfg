const mongoose = require('mongoose')
const dotenv = require('dotenv').config();

const DB_URI = process.env.URI_MONGO

const DB_URI_OLD = process.env.URI_MONGO_ANTIGUA

module.exports = () =>{
    const connect = () =>{
        mongoose.connect(
            DB_URI,
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