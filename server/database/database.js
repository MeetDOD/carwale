const mongoose = require('mongoose')

const connection = async () => {
    try{
        await mongoose.connect(process.env.MONGO)
        console.log('Car Connected to MongoDB');
    }catch(err){
        console.log('Connection Failed',err);
    }
}

module.exports = connection