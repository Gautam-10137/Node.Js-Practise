const fs=require('fs')

if(!fs.existsSync('./new')){
    fs.mkdir('./new',(err)=>{
        if(err) throw err;
        console.log('directory created');
    });
}
// benefit comes when you need to read or deleteor create a file , firstly you need to check that
// is that file exists or not


// to delete a directory
if(fs.existsSync('./new')){
    fs.rmdir('./new', (err)=>{
        if(err) throw err;
        console.log('directory removed');
    });
}