// Structure OF jwt  -> Header – Consists of two parts: the type of token (i.e., JWT) and the signing algorithm 
                 //  ->Payload – Contains the claims that provide information about a user who has been authenticated along with other information such as token expiration time
                //  Signature – Final part of a token that wraps in the encoded header and payload, along with the algorithm and a secret

const express=require('express');
const path=require('path')
const app=express();
const {logger}=require('./middleWare/logEvents');
const cors=require('cors');
const corsOptions=require('./config/corsOptions')
const PORT=process.env.PORT||3500;  
const cookieParser=require('cookie-parser')
const errorHandler=require('./middleWare/errorHandler')     
const verifyJWT=require('./middleWare/verifyJWT');

app.use(logger);

app.use(cors(corsOptions));




app.use(express.urlencoded({extended:false}));  

app.use( express.json())

// middleware for cookie
app.use(cookieParser())
app.use('/',express.static(path.join(__dirname,'/public')));    
// routes
app.use('/',require('./routes/root'))
app.use('/register',require('./routes/register'))
app.use('/auth',require('./routes/auth'))


app.use('/refresh',require('./routes/refresh'))
app.use('/logout',require('./routes/logout'))


app.use(verifyJWT)  //now everything below this line will use verifyJWT
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


//  you should put .env in git ignore