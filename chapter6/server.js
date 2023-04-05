const express=require('express');
const path=require('path');
const app=express();
const PORT=process.env.PORT||3500;


// ^/$ means ^->start with / & $-> ends with /
app.get('^/$|/index(.html)?',(req,res)=>{           //means (.html)? is optional
    // res.sendFile('./views/index.html',{root:__dirname});
    res.sendFile(path.join(__dirname,'views','index.html'));
})

app.get('^/$|/new-page(.html)?',(req,res)=>{           //means (.html)? is optional
   
    res.sendFile(path.join(__dirname,'views','new-page.html'));
})

app.get('/oldpage(.html)?',(req,res)=>{
    res.redirect(301,'/new-page.html'); //302 is by default
})



// route  handelers
app.get('/hello(.html)?',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','hello.html')) 
    console.log("attempted to load hello.html")                         
    next()                                               //chaining of functions
}, //if(that donot works then we hane next anonymous function)
   (req,res)=>{ res.send("Hello Gautam")} 
)



// chaining route handelers
const one=(req,res,next)=>{
    console.log('one');
    next();
}
const two=(req,res,next)=>{
    console.log('one');
    next();
}
const three=(req,res)=>{
    console.log('three');
    console.log('finished');
    // res.send('ello')
  
}
app.get('/chain(.html)?',[one,two,three])

app.get('/*',(req,res)=>{     //any other route
    res.status(404).sendFile(path.join(__dirname,'views','404.html'))
})


// server will not start until we listen to it.
app.listen(PORT,()=>{
    console.log(`Hello I am listening carefully on port ${PORT}`);
})


// here express automaticaly set the content type and statusCode
