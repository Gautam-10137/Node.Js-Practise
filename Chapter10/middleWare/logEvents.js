// how to make events and how to use them?

// here we are making event handler  , i.e. module
// Every action on a computer is an event. Like when a connection is made or a file is opened.
// You can assign event handlers to your own events with the EventEmitter object.
const {format}=require('date-fns');
const{v4:uuid}=require('uuid');
// we use events to get to know about activity of our server
const fs=require('fs');
const fsPromises=require('fs').promises;
const path=require('path')

const logEvents=async(message,logName)=>{
    const dateTime=`${format(new Date(),"MMddyyyy\tHH:mm:ss")}`;
    const logItem=`${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try{
    if(!fs.existsSync(path.join(__dirname , '..','logs'))){
          await fsPromises.mkdir(path.join(__dirname,'..','logs'))
    }
    await fsPromises.appendFile(path.join(__dirname,'..','logs',logName),logItem);
}
catch(err){
     console.log(err);
}
}

const logger=(req,res,next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt');
    console.log(`${req.method}  ${req.path}`);
    next();
}
module.exports={logEvents,logger};