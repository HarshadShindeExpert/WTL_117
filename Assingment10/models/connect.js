const mongoose=require('mongoose');

mongoose
.connect("mongodb://127.0.0.1:27017/signup")
.then(()=>console.log("Database connected !"))
.catch((err)=>console.log("Mongo cha error : ",err));

const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    }
});

const user=mongoose.model("User",userSchema);

module.exports=user;
