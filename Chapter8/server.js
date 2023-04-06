const express=require('express');
const path=require('path')
const app=express();
const {logger}=require('./middleWare/logEvents');
const cors=require('cors');
const PORT=process.env.PORT||3500;  
const errorHandler=require('./middleWare/errorHandler')     

app.use(logger);

const whiteList=['https://www.yoursite.com','http://127.0.0.1:5500','http://localhost:3500'];

const corsOptions={
    origin:(origin,callback)=>{
          if(whiteList.indexOf(origin)!=-1|| !origin ){
            callback(null,true);      
          }
          else{
            callback(new Error('Not allowed by cors'));
          }
    },
    optionsSuccessStatus:200
}

app.use(cors(corsOptions));




app.use(express.urlencoded({extended:false}));  

app.use( express.json())

app.use('/',express.static(path.join(__dirname,'/public')));    
app.use('/subdir',express.static(path.join(__dirname,'/public'))); 

// routes
app.use('/',require('./routes/root'))
app.use('/subdir',require('./routes/subdir'));
app.use('/employees',require('./routes/api/employees'));





app.all('/*',(req,res)=>{     
    res.status(404);  
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

