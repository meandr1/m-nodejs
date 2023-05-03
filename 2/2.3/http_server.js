let http = require('http');
let port = 8888
let server = http.createServer()

server.listen(port, function () {
    console.log(`Server started on port ${port} at ${new Date(Date.now())}`);
});

server.on('request', function (req, res) {
    
    console.log(`IP: ${req.socket.remoteAddress} Port: ${req.socket.remotePort} Connected at ${new Date(Date.now())}`);
    
    let userData
    
    req.on('data', function (data) {
        userData = data.toString()
    });

    req.on('end', function () {
        console.log(`>> data received : ${userData} `);
        res.end(userData);
        console.log(`Connection closed at: ${new Date(Date.now())}`);
    });
});