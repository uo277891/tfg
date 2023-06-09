const { MongoClient } = require('mongodb');
const dot = require('dotenv').config();

const DB_URI_BACKUP = process.env.URI_MONGO

const backup = async () =>{
    const base = await MongoClient.connect(DB_URI_BACKUP);
    const db = base.db('socialfs');
    const dbBackup = base.db('backup');

    const seg = await db.collection('seguidores');
    const segBackup = await dbBackup.collection('seguidores');
    const seguidores = await seg.aggregate([{$match: {}}]);
    const arraySeguidores = await seguidores.toArray();
    await segBackup.deleteMany()
    await segBackup.insertMany(arraySeguidores)

    const com = await db.collection('comentarios');
    const comBackup = await dbBackup.collection('comentarios');
    const comentarios = await com.aggregate([{$match: {}}]);
    const arrayComentarios = await comentarios.toArray();
    await comBackup.deleteMany()
    await comBackup.insertMany(arrayComentarios)

    const pub = await db.collection('publicaciones');
    const pubBackup = await dbBackup.collection('publicaciones');
    const publicaciones = await pub.aggregate([{$match: {}}]);
    const arrayPublicaciones = await publicaciones.toArray();
    await pubBackup.deleteMany()
    await pubBackup.insertMany(arrayPublicaciones)

    const usu = await db.collection('usuarios');
    const usuBackup = await dbBackup.collection('usuarios');
    const usuarios = await usu.aggregate([{$match: {}}]);
    const arrayUsuarios = await usuarios.toArray();
    await usuBackup.deleteMany()
    await usuBackup.insertMany(arrayUsuarios)

    console.log("Backup realizado con éxito")
    await base.close()
}

module.exports = {
    backup: backup
}