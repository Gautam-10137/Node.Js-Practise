//if we want to avoid callback hell as in index.js (callback inside callback)
const fsPromises=require('fs').promises;
// A promise is basically an advancement of callbacks in Node.   

// Promises notify whether the request is fulfilled or rejected. Callbacks can be registered with the .then() to handle fulfillment and rejection. 
// A Promise is a proxy for a value not necessarily known when the promise is created. 
// can be of 3 types:- pending , fulfilled or rejected
const path=require('path');

// Async functions  denoted by the async keyword,always return a promise, In an async function, 
// you can await any Promise or catch its rejection cause
const fileOps=async()=>{
    try{
        const data=await fsPromises.readFile(path.join(__dirname,'files','moto.txt'),'utf8');
        console.log(data);
        // we use unlink to delete a file
        await fsPromises.unlink(path.join(__dirname,'files','moto.txt'),'utf8');
      
        await fsPromises.writeFile(path.join(__dirname,'files','moto1.txt'),data);
        await fsPromises.appendFile(path.join(__dirname,'files','moto1.txt'),"\nNice to meet you!");
        // await fsPromises.rename(path.join(__dirname,'files','moto.txt'),path.join(__dirname,'files','moto1.txt'));       
        const newdata=await fsPromises.readFile(path.join(__dirname,'files','moto1.txt'),'utf8');
        console.log(newdata);         
    }
    catch(err){
        console.error(err);
    }
}
fileOps();