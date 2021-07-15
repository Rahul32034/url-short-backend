const JWT = require("jsonwebtoken");

const authentication=(req,res,next) =>{
  if(req.headers.authorization.length){
    jwt.verify(req.headers.authorization,process.env.PASS, (err,decoded) =>{
      if(err){
        res.status(401).json({message:"token Authorization failed"});
      }
    });
    next();
  }
  else{
    res.status(401).json({message:"no token in header"});
  }
}
module.exports={
  authentication
}