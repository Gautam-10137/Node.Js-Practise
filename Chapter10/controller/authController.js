const usersDB={
    users: require('../model/users.json'),
    setUsers:function(data){
        this.users=data;
    }
}
const bcrypt=require('bcrypt') 

const handleLogin=async(req,res)=>{
    const {user,pwd}=req.body;
    if(!user || !pwd){
        return res.status(400).json({'message':'ussername & password are required'})
    }    
    const foundUser=usersDB.users.find(person=>person.username===user);
    if(!foundUser) return res.sendStatus(401);  //unathorized
    const match=await bcrypt.compare(pwd,foundUser.password);
    if(match){
        // create JWTs   (protect our api)
        res.json({'success':`User ${user} is logged in`})
    }
    else res.sendStatus(401);
}

module.exports=handleLogin;