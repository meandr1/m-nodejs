import express from 'express'
import path from 'path'
import cors from 'cors'
import { MongoClient, Collection } from "mongodb"

const app = express()
const port: number = 3005
const client: MongoClient = new MongoClient("mongodb://127.0.0.1:27017/")
const todoList: Collection = client.db("todos").collection("items")
const counterValue: Collection = client.db("todos").collection("counter")
let todoCounter: number;

app.use(express.json())
app.use(express.static(path.join(__dirname, '../static')))
app.use(
    cors({
        origin: 'http://127.0.0.1:3005',
        credentials: true
    })
);

client.connect()
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


app.get('/api/v1/items', async (req, res) => {
    try {
        res.send({ items: await todoList.find().toArray() })
    } catch (err) {
        res.status(500).send({ "error": `${(err as Error).message}` })
    }
});

app.post('/api/v1/items', (req, res) => {
    try {
        todoList.insertOne({ id: ++todoCounter, text: req.body.text, checked: false }).then(insertRes => {
            counterValue.updateOne({ counter: todoCounter - 1 }, { $set: { counter: todoCounter } }).then(updateResult => {
                if (updateResult.modifiedCount && insertRes.acknowledged) res.send(JSON.stringify({ id: todoCounter }))
                else res.status(500).send({ "error": "Failed to add item" })
            })
        })
    } catch (err) {
        res.status(500).send({ "error": `${(err as Error).message}` })
    }
})

app.put('/api/v1/items', (req, res) => {
    let newStatus: boolean = req.body.checked
    let newText: string = req.body.text
    try {
        todoList.updateOne({ id: req.body.id }, { $set: { text: newText, checked: newStatus } }).then(updateResult => {
            if (updateResult.modifiedCount) res.send(JSON.stringify({ ok: true }))
            else res.status(500).send({ "error": "Failed to update item" })
        })
    } catch (err) {
        res.status(500).send({ "error": `${(err as Error).message}` })
    }
})

app.delete('/api/v1/items', (req, res) => {
    try {
        todoList.deleteOne({ id: req.body.id }).then(delResult => {
            if (delResult.deletedCount) res.send(JSON.stringify({ ok: true }))
            else res.status(500).send({ "error": "Failed to delete item" })
        })
    } catch (err) {
        res.status(500).send({ "error": `${(err as Error).message}` })
    }
})