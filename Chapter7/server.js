// creating rotes for each route (every router can run on their own server)
const express=require('express');
const path=require('path')
const app=express();
const {logger}=require('./middleWare/logEvents');
const cors=require('cors');
const PORT=process.env.PORT||3500;  //why we put {} in logger but not in errorHandler,since w r using 1 of  func of logEvent module 
const errorHandler=require('./middleWare/errorHandler')                                                  //and usingony function in errorHand module
// we will learn middleware  anything b/w req & res is middleware
// e.g. route handeler is a middleware ,we do thing in annymous functon of get ,that is also middleware

// for middleware we write -> app.use()

// custom middleware logger  & in custom middleware we have to provide next keyword, but not in builtin
app.use(logger);

// another middleware
// app.use(cors());  //Cross-Origin Resource Sharing  (using it we can fetch our data on console of other site)
//Note if we just use cors() , the it will allow every one to access to our backend ,so we have to set who can acccess our backend
const whiteList=['https://www.yoursite.com','http://127.0.0.1:5500','http://localhost:3500'];
// in whitelist you can put your fontend projects links,your react website ,,,,etc.
const corsOptions={
    origin:(origin,callback)=>{
          if(whiteList.indexOf(origin)!=-1|| !origin ){
            callback(null,true);      //err->null & allow=true
          }
          else{
            callback(new Error('Not allowed by cors'));
          }
    },
    optionsSuccessStatus:200
}

app.use(cors(corsOptions));




// built-in middleware to handle urlencoded data(i.e. form data)
// Express.urlencoded() expects request data to be sent encoded in the URL, usually in strings or arrays:
app.use(express.urlencoded({extended:false}));  // if form data is submitted

// built-in middleware for json  , if json data is smbitted
app.use( express.json())

// built-in middleware to serve static files like css ,image
app.use(express.static(path.join(__dirname,'/public')));    //means have to put these files in public folder

app.get('^/$|/index(.html)?',(req,res)=>{           
    res.sendFile(path.join(__dirname,'views','index.html'));
})

app.get('^/$|/new-page(.html)?',(req,res)=>{           
    res.sendFile(path.join(__dirname,'views','new-page.html'));
})

//custom error handling otherswise express handles it automatically 
// app.use(function(err,req,res,next){
//     console.error(err.stack);         //The error.stack property is a string describing the point in the code at which the Error was instantiated
//     res.status(500).send(err.message);
// }
// )

// app.use() vs app.all()      .use()->applies specified middleware ,When attaching middleware to the main app stack, the order of attachment matters; 
//  .all()  ->will attach to the app’s implicit router,attaches a particular piece of middleware to all HTTP methods, if attached in the main config file will globally apply the middleware to all requests made to your app.      


// why we go to .all()   -> .use() donot accept ajax & .all can accept ajax & can be apply to all http methods ,hence will use for routing
app.all('/*',(req,res)=>{     
    res.status(404);   // it can be possible if some req donot accept html 
    if(req.accepts('html')){
    res.sendFile(path.join(__dirname,'views','404.html'));
    }
    else if(req.accepts('json')){
        res.json({error:'404 Not Found'});
    }
    else{
        res.type('text').send("404 Not Found");
    }
})

app.use(errorHandler);




app.listen(PORT,()=>{
    console.log(`Hii! I am listening carefuly at port ${PORT}`);
})

