// How to build a server   using http module
const http=require('http');

const fs=require('fs');
const fsPromises=require('fs').promises;
const logEvents =require('./logEvents');
const EventEmitter=require('events');
class Emitter extends EventEmitter{}
const myEmitter=new Emitter();
const path=require('path');
myEmitter.on('log',(msg,fileName)=>logEvents(msg,fileName));
const PORT=process.env.PORT||3500;

const serveFile=async(filePath,contentType,response)=>{    //async function always come with try catch block
       try{
             const rawData =await fsPromises.readFile(filePath,
                !contentType.includes('image')?'utf8':''                  // now image donot use utf8 encoding
                );    
            //  if content type is json
            const data=contentType==='application/json'?JSON.parse(rawData):rawData;
             response.writeHead(
                !contentType.includes('404')?200:404
                ,{'Content-type':contentType});
             response.end(
                contentType==='application/json'?JSON.stringify(data):data
                );
       }
       catch(err){
              console.log(err);
              response.statusCode=500;
              myEmitter.emit('log',`${err.name}\t${err.message}`,'errLog.txt');
              response.end();
       }
}
const server=http.createServer((req,res)=>{
    myEmitter.emit('log',`${req.url}\t${req.method}`,'reqLog.txt');
     console.log(req.url,req.method);
    // let filePath;
    //       if(req.url=='/'||req.url=='index.html'){
    //         res.statusCode=200;
    //         res.setHeader('Content-type','text/html');
    //         filePath=path.join(__dirname+'views'+'index.html');
    //         fs.readFile(filePath,(err,data)=>{
    //             res.send(data);
    //         })
    //       }
    // But we fhave so much files so setting content type for multiple things :-
          const extension=path.extname(req.url);
        let contentType;
          switch(extension){
            case '.css':
                contentType="text/css";
                break;
            case '.js':
                contentType="text/javascript";
                break;
            case '.png':
                contentType="image/png";
                break;
            case '.jpg':
                contentType="image/jpeg";
                break;
            case '.txt':
                contentType="text/plain";
                break;
            case '.json':
                contentType='application/json';
                break;
            default:
                contentType='text/html';
          }
        
        let filePath=
              contentType==='text/html'&&req.url==='/'?path.join(__dirname,'views','index.html'):contentType==='text/html'&&req.url.slice(-1)==='/'
              ?path.join(__dirname,'views',req.url,'index.html'):contentType==='text/html'?path.join(__dirname,'views',req.url):path.join(__dirname,req.url);
            

//   if we donot specify .html in url
    if(!extension && req.url.slice(-1)!=='/') filePath+='.html';
    const fileExists=fs.existsSync(filePath);
    if(fileExists){
        // serve the file  // here we need a function  that will show up the desired file
        serveFile(filePath,contentType,res);
    }
    else{  //we can redirect to other page  or send 404 code
        //  console.log(path.parse(filePath));
        switch(path.parse(filePath).base){
            case 'old.html':
                res.writeHead(301,{'Location':'/new-page.html'});
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301,{'Location':'/new-page.html'});
                res.end();
                break;
            default:
                serveFile(path.join(__dirname,'views','404.html'),"text/html",res);
                
        }

    }
          
});


// server will not start until we listen to it.
server.listen(PORT,()=>{
    console.log(`Hello I am listening carefully on port ${PORT}`);
})

