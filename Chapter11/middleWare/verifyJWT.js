const jwt=require('jsonwebtoken')
require('dotenv').config();

const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401)
    console.log(authHeader) //  will look like ->  bearer  token          // so will remove this space to get token
    const token=authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{ //callback function  &   we can call decoded as token
            if(err) return res.sendStatus(403)  // means invalid token  -> you r forbidden to access
            req.user=decoded.username  // decoded.username have username which we pass in jwt as parameter
            next();
        }
    )
}
module.exports=verifyJWT
