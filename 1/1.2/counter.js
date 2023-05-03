const express = require('express')
const app = express()
const port = 8000
const path = __dirname + "/counter.txt"

let counter 
try {
  counter = +require("fs").readFileSync(path).toString().split("=")[1];
} catch (error) {
  require("fs").writeFileSync(path, `counter=0`)
  counter = 0
}

app.get('/hello/', (req, res) => {
  res.send(`${require("fs").readFileSync(path).toString()}`)
  require("fs").writeFileSync(path, `counter=${counter++}`)
})

app.listen(port, () => {
  console.log(`Counter app listening on port ${port}`)
})