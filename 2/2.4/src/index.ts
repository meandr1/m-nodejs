import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
const MongoClient = require("mongodb").MongoClient;

const app = express()
const jsonParser = bodyParser.json()
const port: number = 3005


const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");

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

app.get('/api/v1/items', (req, res) => {
    res.send(JSON.stringify(todoList))
});

app.post('/api/v1/items', jsonParser, (req, res) => {
    todoList.items.push({ id: todoCounter++, text: req.body.text, checked: false })
    updateData()
    res.send(JSON.stringify({ id: todoCounter - 1 }))
})

app.put('/api/v1/items', jsonParser, (req, res) => {
    let newStatus: boolean = req.body.checked
    let newText: string = req.body.text
    let index: number = todoList.items.findIndex(item => item.id === req.body.id)
    if (newStatus !== todoList.items[index].checked) {
        todoList.items[index].checked = newStatus
    } else if (newText !== todoList.items[index].text) {
        todoList.items[index].text = newText
    }
    updateData()
    res.send(JSON.stringify({ ok: true }))
})

app.delete('/api/v1/items', jsonParser, (req, res) => {
    let index: number = todoList.items.findIndex(item => item.id === req.body.id)
    todoList.items.splice(index, 1)
    updateData()
    res.send(JSON.stringify({ ok: true }))
})

function updateData(): void {

}