const usersDB={
    users: require('../model/users.json'),
    setUsers:function(data){
        this.users=data;
    }
}
const bcrypt=require('bcrypt') 
const jwt=require('jsonwebtoken')
require('dotenv').config();
const fsPromises=require('fs').promises;
const path=require('path')
const cookie=require('cookie-parser')
const handleLogin=async(req,res)=>{
    const {user,pwd}=req.body;
    if(!user || !pwd){
        return res.status(400).json({'message':'username & password are required'})
    }    
    const foundUser=usersDB.users.find(person=>person.username===user);
    if(!foundUser) return res.sendStatus(401);  //unathorized
    const match=await bcrypt.compare(pwd,foundUser.password);
    if(match){
        const roles=Object.values(foundUser.roles);
        // create JWTs   (protect our api)
        // making tokens                              
        // JWT uses the sign() method to create a JSON Web Token for that user and returns the token in the form of a JSON string.
        const accessToken=jwt.sign(

                      { "UserInfo":{
                        "username":foundUser.username,
                        "roles":roles
                      }
                    }
                        , 
                       
                      process.env.ACCESS_TOKEN_SECRET,  //secret
                      {expiresIn:'30s'}                  //expiration time
                      
        );  
        const refreshToken=jwt.sign(
                      { "username":foundUser.username},  //payload , these all payloads are available to all if they get hold on your   token so only pass the username
                      process.env.REFRESH_TOKEN_SECRET,  //secret
                      {expiresIn:'1d'}                  //expiration time  of automatic log out
                      
        );  
        // will store refreshtoken in database , which will allow us to perform logout route by  invaidate the refresh token
        // saving refreshToken  with current user
        const otherUsers=usersDB.users.filter(person=>person.username!=foundUser.username);
        const currentUser={...foundUser,refreshToken}
        usersDB.setUsers([...otherUsers,currentUser])
        await fsPromises.writeFile(
            path.join(__dirname,'..','model','users.json'),
            JSON.stringify(usersDB.users)
        )
    // now we need to store refreshtoken in such a way that it is not available  via javacript
    // so  storing it in a cookie with property 'httpOnly' and securing it
        res.cookie('jwt',refreshToken,{httpOnly:true,maxAge:24*60*60*1000}); 
        res.json({accessToken})
    }
    else res.sendStatus(401);
}

module.exports=handleLogin;