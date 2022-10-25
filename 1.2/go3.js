function readHttpLikeInput() {
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for (; ;) {
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) { break; /* windows */ }
        if (buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10)
                break;
            was10++;
        } else
            was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();

function outputHttpResponse(statusCode, statusMessage, headers, body) {

    console.log(`HTTP/1.1 ${statusCode} ${statusMessage}
Date: ${new Date().toString()}
Server: Apache/2.2.14 (Win32)
Connection: Closed
Content-Type: text/html; charset=utf-8
Content-Length: ${((body && body.body || body) + "").length}

${body && body.body || body}`);
}

function processHttpRequest($method, $uri, $headers, $body) {
    let num = $uri.includes("=") ? $uri.split("=")[1].split(" ")[0].split(",").reduce((a, b) => +a + +b) : undefined
    let newBody = $body && $body.body || num;
    if ($method === "GET" && num === 10) {
        outputHttpResponse(200, "OK", $headers, newBody);
    } else if (!$uri.startsWith("/sum")) {
        outputHttpResponse(404, "Not Found", $headers, newBody);
    } else {
        outputHttpResponse(400, "Bad Request", $headers, newBody);
    }
}

function parseTcpStringAsHttpRequest(string) {
    let res = {}
    let str = string.split("\n")
    res.method = str[0].split(" ")[0]
    res.uri = str[0].split(" ")[1]
    if (str.length > 1) res.headers = {}
    for (let i = 1; i < str.length; i++) {
        if (str[i] === "") {
            res.body = str[i + 1]
            break;
        }
        let header = str[i].split(":")
        res.headers[header[0]] = header[1].trim()
    }
    return res
}

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);
