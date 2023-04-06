// will organise nodejs & express according to model view controller (MVC)
// will make methods of http of employees in employees controller

const express=require('express');
const path=require('path')
const app=express();
const {logger}=require('./middleWare/logEvents');
const cors=require('cors');
const corsOptions=require('./config/corsOptions')
const PORT=process.env.PORT||3500;  
const errorHandler=require('./middleWare/errorHandler')     

app.use(logger);

app.use(cors(corsOptions));




app.use(express.urlencoded({extended:false}));  

app.use( express.json())

app.use('/',express.static(path.join(__dirname,'/public')));    
// routes
app.use('/',require('./routes/root'))

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

