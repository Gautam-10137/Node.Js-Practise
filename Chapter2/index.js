// tpo read & write files
const fs=require('fs');

//  instead of writing full path ,we can use path module (Since writing full path can give errors)
// The path.join() method is used to join a number of path-segments using the platform-specific delimiter to form a single path
const path=require('path');
// fs.readFile('./files/myfile.txt',(err,data)=>{
    fs.readFile(path.join(__dirname,'files','myfile.txt'),(err,data)=>{
    if(err) throw err;
    // console.log(data);      this will print a buffer
    console.log(data.toString());  // use .toString() or can provide utf-8 parameter to .readFile before function
})

console.log("Heloo......");  // to show that fs.readFile is an asyncfunction (heloo.. prints before print of file) 
                            //  i.e. fie is being read while printing heloo....

 fs.writeFile(path.join(__dirname,'files','new.txt'),'helo Moto!',(err)=>{
     if(err) throw err;
     console.log('Write Complete'); 
    //  it is better to write append method inside callback function of write file
     fs.appendFile(path.join(__dirname,'files','new.txt'),'\n How are you?',(err)=>{
        if(err) throw err;
        console.log('Append Complete'); 
        // if we want to do something afte appending , so put that inside callback funcion of append
        // rename new.txt to moto.txt
        fs.rename(path.join(__dirname,'files','new.txt'),path.join(__dirname,'files','moto.txt'),(err)=>{
            if(err) throw err;
            console.log('Rename Complete'); 
            
        })
        
    })
 })

// Note we can't control async function , and in above we are controlling methods by  putting into callback functions

// exit on uncaught errors    
// Note - process object is a global object and can be accessed from anywhere.
// its methods include exit , befoeExit , uncaughtException , Signal Events
process.on('uncaughtException',err=>{
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
})