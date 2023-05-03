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
    let server = "Apache/2.2.14 (Win32)"
    let connection = "Closed"
    let contentType = "text/html; charset=utf-8"
    console.log(`HTTP/1.1 ${statusCode} ${statusMessage}
Date: ${new Date().toString()}
Server: ${server}
Content-Length: ${((body?.body || body) + "").length}
Connection: ${connection}
Content-Type: ${contentType}

${body?.body || body}`);
}

function processHttpRequest($method, $uri, $headers, $body) {

    if ($method !== "POST" || $uri !== "/api/checkLoginAndPassword" ||
        $headers['Content-Type'] !== "application/x-www-form-urlencoded") {
        outputHttpResponse(404, "Not Found", $headers, "Not Found");
    }

    let [log, pass] = $body.split("&").map(item => item.split("=")[1])
    let db
    try {
        db = require("fs").readFileSync(__dirname + "/passwords.txt").toString()
    } catch (error) {
        outputHttpResponse(500, "Internal Server Error", $headers, 'Internal Server Error');
        return;
    }
    for (const pair of db.split("\r\n")) {
        if (pair === `${log}:${pass}`) {
            outputHttpResponse(200, "OK", $headers, '<h1 style="color:green">FOUND</h1>');
            return;
        }
    }
    outputHttpResponse(204, "OK", $headers, '<h1 style="color:red">NOT FOUND</h1>');
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