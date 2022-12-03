import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import { MongoClient, Collection } from "mongodb"

const app = express()
const jsonParser = bodyParser.json()
const port: number = 3005
const client: MongoClient = new MongoClient("mongodb://127.0.0.1:27017/")
const todoList: Collection = client.db("todos").collection("items")
const counterValue: Collection = client.db("todos").collection("counter")
let todoCounter: number;

app.use(express.static(path.join(__dirname, '../static')))
app.use(
    cors({
        origin: 'http://127.0.0.1:3005',
        credentials: true
    })
);

(async () => {
    await client.connect()
        .then(() => {
            console.log('DB connection established');
            counterValue.find().next().then((cnt) => {
                if (cnt === null) {
                    todoCounter = 0
                    counterValue.insertOne({ counter: 0 })
                } else {
                    todoCounter = cnt.counter
                }
            });
            app.listen(port, () => {
                console.log(`TODO's server listening on port ${port}`)
            });
        });
})();

app.get('/api/v1/items', async (req, res) => {
    res.send({ items: await todoList.find().toArray() })
});

app.post('/api/v1/items', jsonParser, (req, res) => {
    todoList.insertOne({ id: ++todoCounter, text: req.body.text, checked: false }).then(insertRes => {
        counterValue.updateOne({ counter: todoCounter - 1 }, { $set: { counter: todoCounter } }).then(updateResult => {
            if (updateResult.acknowledged && insertRes.acknowledged) res.send(JSON.stringify({ id: todoCounter }))
            else res.sendStatus(500)
        })
    })
})

app.put('/api/v1/items', jsonParser, (req, res) => {
    let newStatus: boolean = req.body.checked
    let newText: string = req.body.text
    todoList.updateOne({ id: req.body.id }, { $set: { text: newText, checked: newStatus } }).then(updateResult => {
        if (updateResult.acknowledged) res.send(JSON.stringify({ ok: true }))
        else res.sendStatus(500)
    })
})

app.delete('/api/v1/items', jsonParser, (req, res) => {
    todoList.deleteOne({ id: req.body.id }).then(delResult => {
        if (delResult.acknowledged) res.send(JSON.stringify({ ok: true }))
        else res.sendStatus(500)
    })
})