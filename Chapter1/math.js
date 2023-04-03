// creating our own module

// creating arrow functions to be exported 
const add=(a,b)=>a+b;
const subtract=(a,b)=>a-b;
const multiply=(a,b)=>a*b;
const divide=(a,b)=>a/b;

module.exports={add,subtract,multiply,divide};

//     or insert functions directly in exports
// exports.add=(a,b)=>a+b;
// exports.subtract=(a,b)=>a-b;
// exports.multiply=(a,b)=>a*b;
// exports.divide=(a,b)=>a/b;
