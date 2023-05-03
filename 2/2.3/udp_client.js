let udp = require('dgram');
let port = 8888

// creating a client socket
let client = udp.createSocket('udp4');
let startTime = Date.now()

client.on('message',function(msg,info){
  console.log(`Data received from server (IP: ${info.address} Port: ${info.port}): ${msg.toString()}`);
  client.close();
});

//sending msg
client.send("Hi from the client",port,'localhost',function(error){
  if(error) client.close();
});

client.on('close',()=>{
  console.log(`Connection Closed. Total data transfer time: ${Date.now() - startTime}ms`)
})