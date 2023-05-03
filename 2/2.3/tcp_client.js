const net = require('net');

const port = 8888;

//Create the socket client.
const client = new net.Socket();
let startTime = Date.now()

//Connect to the server on the configured port 
client.connect(port,function(){
   //Log when the connection is established
   console.log(`Connected to server on port ${port}`);
   
   //Try to send data to the server 
   client.write('Hi from the client');

});
//Handle data coming from the server
client.on('data',function(data){
   console.log(`Client received from server: ${data}`);    
});
// Handle connection close 
client.on('close',function(){
   console.log(`Connection Closed. Total data transfer time: ${Date.now() - startTime}ms`);
});
//Handle error
client.on('error',function(error){
   console.error(`Connection Error ${error}`); 
});