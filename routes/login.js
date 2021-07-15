const e = require("express");
var express=require("express");
var router =express.Router();
var JWT =require("jsonwebtoken");

const {getUser,userregister,userlogin,forgetpassword,stringexpire,stringverify, passwordreset, getshortUrl, activateaccount, createshortUrl, clickcount} = require("../controller/login");

const{authentication}=require("../middleware/auth");
router.get("/",async(req,res)=>{
  try{
    const loginData=await getUser();
    res.status(200).json(loginData);
  }

  catch(error){
    console.log(error);
    res.statusCode(500);
  }
})

router.post("/register",async(req,res)=>{
  try{
    const {firstname,lastname,email,password}=req.body;
    const response =await userregister(firstname,lastname,email,password);
    res.status(response.status).json(response.msg);
  }
  catch(error){
    console.log(error);
    res.statusCode(500);
  }
});

router.post("/login",async(req,res)=>{
  try{
    const{email,password}=req.body;
    const response=await userlogin(email,password);
    res.status(response.status).json(response);

  }
  catch(error){
    console.log(error);
      res.statusCode(500);
  }
})

router.post("/forgot",async(req,res)=>{
  try{
    const{email}=req.body;
    const response= await forgetpassword(email);
    res.status(response.status).json(response.msg);
    setTimeout(stringexpire, 30000, email);
  }
  catch(error){
    console.log(error);
    res.statusCode(500);
  }
});

router.post("/verifyString",async(req,res)=>{
  try{
    const {email,randomString}=req.body;
    const response=await stringverify(email,randomString);
    res.status(response.status).json(response.msg);
  }
  catch(error){
    console.log(error);
    res.statusCode(500);
  }
})
router.put("/reset",async(req,res)=>{
  try{
    const {email,password}=req.body;
    const response=await passwordreset(email,password);
    res.status(response.status).json(response.msg);
  }
  catch(error){
    console.log(error);
    res.statusCode(500);
  }
})
router.put('/userActivate', async(req, res) => {
  try {
    const {email} = req.body;
    const response = await activateaccount(email);
    res.status(response.status).json(response.msg);
  } 
  catch (error) {
    console.log(error);
    res.statusCode(500);
  }
})


router.post("/urlShort",async(req,res)=>{
  try{
    const {url,email}=req.body;
    const response=await createshortUrl(url,email);
    res.status(response.status).json(response.msg);
  }
  catch(error){
    console.log(error);
    res.statusCode(500);
  }
})

router.post("/clickUser",async(req,res)=>{
  try{
    const {url,email}=req.body;
    const response =await clickcount(url,email);
    res.status(response.status).json(response.msg);
  }
  catch(error){
    console.log(error);
    res.statusCode(500);
  }
})
router.post("/getUrlShort",async(req,res)=>{
  try{
    const{email}=req.body;
    const response=await getshortUrl(email);
    res.status(200).json(response)
  }
  catch(error){
    console.log(error);
    res.statusCode(500);
  }
})
module.exports=router;