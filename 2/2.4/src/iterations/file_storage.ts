import express from 'express'
import path from 'path'
import fs from 'fs'
import cors from 'cors'

const app = express()
const port: number = 3005
const counterPath: string = __dirname + "/counter.txt"
const listPath: string = __dirname + "/todoList.json"

app.use(express.json())
app.use(express.static(path.join(__dirname, '../static')))
app.use(
    cors({
        origin: 'http://127.0.0.1:3005',
        credentials: true
    })
);

let todoCounter: number;
try {
    todoCounter = +fs.readFileSync(counterPath).toString().split("=")[1];
} catch (error) {
    fs.writeFileSync(counterPath, `todoCounter=0`)
    todoCounter = 0;
}

let todoList: { items: { id: number, text: string, checked: boolean }[] } = { items: [] };
try {
    todoList = JSON.parse(fs.readFileSync(listPath).toString());
} catch (error) {
    todoList = { items: [] };
    fs.writeFileSync(listPath, JSON.stringify(todoList))
}


app.listen(port, () => {
    console.log(`TODO's server listening on port ${port}`)
});

app.get('/api/v1/items', (req, res) => {
    res.send(JSON.stringify(todoList))
});

app.post('/api/v1/items', (req, res) => {
    todoList.items.push({ id: ++todoCounter, text: req.body.text, checked: false })
    updateData()
    res.send(JSON.stringify({ id: todoCounter }))
})

app.put('/api/v1/items', (req, res) => {
    let newStatus: boolean = req.body.checked
    let newText: string = req.body.text
    let index: number = todoList.items.findIndex(item => item.id === req.body.id)
    todoList.items[index].checked = newStatus
    todoList.items[index].text = newText
    updateData()
    res.send(JSON.stringify({ ok: true }))
})

app.delete('/api/v1/items', (req, res) => {
    let index: number = todoList.items.findIndex(item => item.id === req.body.id)
    todoList.items.splice(index, 1)
    updateData()
    res.send(JSON.stringify({ ok: true }))
})

function updateData(): void {
    fs.writeFileSync(counterPath, `todoCounter=${todoCounter}`)
    fs.writeFileSync(listPath, JSON.stringify(todoList))
}