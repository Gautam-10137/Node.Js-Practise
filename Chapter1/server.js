// How NodeJs differs from Vanilla JS
// 1) Node runs on a server - not in a browser  (backend not  frontend)
// 2) The console  is terminal window
 console.log("Helo world");         
// 3) global object instead of window object
console.log(global);
// Note:- command to run file in terminal is  -> node filename      (no need to write .js)
// 4) Has common core modules  that we will explore    (e.g. to access file system , operating system,etc.)
// 5) CommonJs  modules instead of ES6 modules

// here we use require tatement instead of import statement

// os module
const os=require('os');
// Returns an object containing the operating system's constants for process signals, error cotes etc

// path module
const path=require('path');

// calling our own created module
// const math=require('./math')
//  or destructure it
const {add,subtract,multiply,divide}=require('./math');



// console.log(os.type());
// console.log(os.version());
// console.log(os.homedir());

// console.log(__dirname);
// console.log(__filename);

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

// // .parse returns object containing above inf. (dir,base,ext,etc.)
// console.log(path.parse(__filename));


console.log(add(2,7));
console.log(subtract(9,3));