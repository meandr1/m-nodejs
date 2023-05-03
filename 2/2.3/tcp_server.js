const net = require('net');

const port = 8888;

//Create an instance of the server and attach the client handling callback
const server = net.createServer(onClientConnection);

//Start listening on given port and host.
server.listen(port,function(){
   console.log(`Server started on port ${port} at ${new Date(Date.now())}`); 
});

//the client handling callback
function onClientConnection(sock){
    //Log when a client connnects.
    console.log(`IP: ${sock.remoteAddress} Port: ${sock.remotePort} Connected at ${new Date(Date.now())}`);
    
	//Handle the client data.
    sock.on('data',function(data){
        //Log data received from the client
        console.log(`>> data received : ${data} `);
		
		//prepare and send a response to the client 
		sock.write(data);
		
		//close the connection 
		sock.end()        
	});
    
	//Handle when client connection is closed
    sock.on('close',function(){
        console.log(`Connection closed at: ${new Date(Date.now())}`);
    });
    
	//Handle Client connection error.
    sock.on('error',function(error){
        console.error(`${sock.remoteAddress}:${sock.remotePort} Connection Error ${error}`);
    });
};