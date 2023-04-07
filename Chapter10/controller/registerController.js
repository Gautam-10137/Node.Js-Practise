// pulling users from database
const usersDB={
    users: require('../model/users.json'),
    setUsers:function(data){
        this.users=data;
    }
}
const fsPromises=require('fs').promises
const path=require('path')
const bcrypt=require('bcrypt') //Bcrypt turns a simple password into fixed-length characters called a hash, unique random string that makes the hash unpredictable.

const handleNewUser=async(req,res)=>{
    const {user,pwd}=req.body;
    if(!user || !pwd){
        return res.status(400).json({'message':'ussername & password are required'})
    }
    // check for duplicate
    const duplicate=usersDB.users.find(person=>person.username==user);
    if(duplicate){
      return  res.sendStatus(409)  //confict
    }
    try{
            //  encrypt password
            const hashedpwd=await bcrypt.hash(pwd,10);   // adding salt(10) individually wll make pwd more strong
            const newUser={"username":user,"password":hashedpwd};
            usersDB.setUsers([...usersDB.users,newUser]);
           await fsPromises.writeFile(
            path.join(__dirname,"..",'model','users.json'),
            JSON.stringify(usersDB.users)
           )
           console.log(usersDB.users);
           res.status(201).json({'Success':`New user ${user} created`})
    }
    catch(err){
             res.status(500).json({'message':'err message'})
    }

}

module.exports=handleNewUser