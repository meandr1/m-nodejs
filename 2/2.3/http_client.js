let http = require('http');

let options = {
  host: '127.0.0.1',
  path: '/',
  port: '8888',
  method: 'POST'
};

let startTime = Date.now()

callback = function(response) {
  let data
  response.on('data', function (chunk) {
    data = chunk.toString();
  });

  response.on('end', function () {
    console.log(`Client received from server : ${data}`);
    console.log(`Connection Closed. Total data transfer time: ${Date.now() - startTime}ms`);
  });
}

let req = http.request(options, callback);
req.write("Hi from the client");
req.end();