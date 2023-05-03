let udp = require('dgram');
let port = 8888

// creating a udp server
let server = udp.createSocket('udp4');
server.bind(port);

//emits when socket is ready and listening for datagram msgs
server.on('listening', function () {
    console.log(`Server started on port ${port} at ${new Date(Date.now())}`);
});

// emits on new datagram msg
server.on('message', function (msg, info) {
    console.log(`Data received from client (IP: ${info.address} Port: ${info.port}): ${msg.toString()}`);
    //sending msg
    server.send(msg, info.port, 'localhost',()=>{
        console.log(`Session closed at: ${new Date(Date.now())}`);
    });
});

//emits after the socket is closed using socket.close();
server.on('close', function () {
    console.log(`Socket is closed! at ${new Date(Date.now())}`);
});

// emits when any error occurs
server.on('error', function (error) {
    console.log('Error: ' + error);
    server.close();
});