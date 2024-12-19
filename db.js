const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/gymdatabase"

// Function to connect to MongoDB database
const ConnectToMongo=()=>{
    mongoose.connect(mongoURI,).then(()=>console.log("connected"))
}
module.exports=ConnectToMongo;