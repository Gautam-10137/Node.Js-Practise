const {format}=require('date-fns')
// to generate random string values 
const{v4:uuid}=require('uuid');

console.log(format(new Date(),'MMddyyyy\tHH:mm:ss'));
console .log(uuid());

console.log("Helio");

// need of package.json comes when we want to exoprt out project on github,then we donot need to send modules ,just send package.json
// ,it contains all necessary information.


// in package.json
// "dependencies": {
//     "data-fns": "^1.1.0",
//     "date-fns": "^2.29.3",          these vesion system representationmeans ^a.b.c   a->major version
                              // b->minor version  c->batch     ^->can update in minor version or batch ,but not in major version until allow
                            //   ~->update only batch version
//     "uuid": "^9.0.0"          also can  use  "uuid":"*"  meas it always will work with latest version
//   }
//    to install specific version run-> npm i uuid@8.3.2    
//use  npm update command for any update in packages 

// for remove   -> npm uninstall  nodemon       npm rm nodemon