function readHttpLikeInput(){
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){ 
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
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

function parseTcpStringAsHttpRequest(string) { 
    let res = {}
    let str = string.split("\n")
    res.method = str[0].split(" ")[0]
    res.uri = str[0].split(" ")[1]
    if (str.length>1) res.headers = {}
    for (let i = 1; i < str.length; i++){
        if(str[i] === ""){
            res.body = str[i+1]
            break;
        }
        let header = str[i].split(":")
        res.headers[header[0]] = header[1].trim()
    }
  return res
}

http = parseTcpStringAsHttpRequest(contents); 
console.log(JSON.stringify(http, undefined, 2));

