const mongoose=require('mongoose');
const mongoURI="mongodb+srv://23ee01025:Krishnendu123@cluster0.f4nm2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/gym-database"

// Function to connect to MongoDB database
const ConnectToMongo=()=>{
    mongoose.connect(mongoURI,).then(()=>console.log("connected"))
}
module.exports=ConnectToMongo;