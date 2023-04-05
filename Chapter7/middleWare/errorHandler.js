const {logEvents}=require('./logEvents')  //to log errors

const errorHandler=(err,req,res,next)=>{
    logEvents(`${err.name}:${err.message}`,'errLog.txt');
    console.error(err.stack);         //The error.stack property is a string describing the point in the code at which the Error was instantiated
    res.status(500).send(err.message);
}
module.exports=errorHandler;