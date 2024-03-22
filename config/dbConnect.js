const mongoose = require('mongoose');
const dbConnect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB Connected Sucesfully');
    }catch(error){
        console.log('DB Connection fail', error.message);
    }
};

dbConnect();