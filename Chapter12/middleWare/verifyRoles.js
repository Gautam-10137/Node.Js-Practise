const verifyRoles=  (...allowedRoles )=>{                    //...allowedRoles is using rest oprerator which can accept many arguements 
     return  (req,res,next)=>{
        if(!req?.roles) return res.sendStatus(401);
        const rolesArray=[...allowedRoles];
        const result=req.roles.map(role=>rolesArray.includes(role)).find(val=>val==true);   //find the first true value
        if(!result) res.sendStatus(401);
        next();
     }
}

module.exports=verifyRoles;