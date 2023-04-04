// since we are doing an event(writing to  file) , so we have to use eventemiiter

const logEvents=require('./logEvents');
const EventEmitter=require('events')
// . Emitters in a nutshell are object instances created from either the EventEmitter class or another class that inherits the EventEmiiter class.
class MyEmmiter extends EventEmitter{}

// initialize object
const myEmitter=new MyEmmiter();

// adding listener to log event
myEmitter.on('log',(msg)=>logEvents(msg));

// emitting event ,emit can be used to emit a named event from the created object instance.
setTimeout(()=>{
myEmitter.emit('log','logEvent is successfully emitted');
},2000)