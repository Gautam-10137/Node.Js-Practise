// if we have such a large file , then that readFile & writeFile methods are not efficient

const fs=require('fs');
const rs=fs.createReadStream('./files/moto1.txt',{encoding:'utf8'});
const ws=fs.createWriteStream('./files/newmoto1.txt');

// now accessing the data
rs.on('data',(dataChunk)=>{
    ws.write(dataChunk);
})

//more efficient
rs.pipe(ws);