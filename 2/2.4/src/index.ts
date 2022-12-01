import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
const MongoClient = require("mongodb").MongoClient;

const app = express()
const jsonParser = bodyParser.json()
const port: number = 3005


const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
const db = mongoClient.db("todos")


app.use(express.static(path.join(__dirname, '../static')))
app.use(
    cors({
        origin: 'http://127.0.0.1:3005',
        credentials: true
    })
);

let todoCounter: number;

let todoList: { items: { id: number, text: string, checked: boolean }[] } = { items: [] };


app.listen(port, () => {
    console.log(`TODO's server listening on port ${port}`)
});

app.get('/api/v1/items', async (req, res) => {
    await mongoClient.connect()
    let items = db.collection("items");
    res.send(JSON.stringify(items))
    await mongoClient.close();
});

app.post('/api/v1/items', jsonParser, (req, res) => {
    
})

app.put('/api/v1/items', jsonParser, (req, res) => {
    
})

app.delete('/api/v1/items', jsonParser, (req, res) => {
    
})