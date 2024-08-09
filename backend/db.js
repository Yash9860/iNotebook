const mongoose = require('mongoose')

const monogoURI = 'mongodb+srv://yashkulkarni0987:qx9yEFR8zVd8dsAC@cluster0.ouxiqkv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectToMongo = () =>{
    mongoose.connect(monogoURI)
    .then(() => console.log("connected to db"))
    .catch((err)=> console.log(err))
}

module.exports = connectToMongo;

