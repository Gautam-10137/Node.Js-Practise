const jwt=require('jsonwebtoken')
require('dotenv').config();

const verifyJWT=(req,res,next)=>{
    // const authHeader=req.headers['authorization'];   //it work if we also have frontend
    const authHeader=req.headers.authorization||req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer')) return res.sendStatus(401)
  
    const token=authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{ //callback function  &   we can call decoded as token
            if(err) return res.sendStatus(403)  // means invalid token  -> you r forbidden to access
            req.user=decoded.UserInfo.username;  
            req.roles=decoded.UserInfo.roles;
            next();
        }
    )
}
module.exports=verifyJWT
