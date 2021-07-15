const mongoose =require("mongoose");
const loginSchema=new mongoose.Schema({
    firstname:String,
    lastname:String,
    email: String,
    Password: String,
    randomString: String,
    date:{
        type:String,
        default:Date.now
    },
    url: String,
    status:Boolean,
    click:Number,
    randomString:String
});

const urlSchema=new mongoose.Schema({
    email:String,
    url:String,
    shortner:String,
    shortnerURL:String,
    clicks:Number
})

const User=mongoose.model("user",loginSchema);
const urlShort=mongoose.model("urlShortner",urlSchema);
module.exports={User,urlShort}