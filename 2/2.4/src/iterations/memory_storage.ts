import express from 'express'
import path from 'path'
import cors from 'cors'

const app = express()
const port: number = 3005

app.use(express.json())
app.use(express.static(path.join(__dirname, '../static')))
app.use(
    cors({
        origin: 'http://127.0.0.1:3005',
        credentials: true
    })
);

let todoCounter: number = 0;
const todoList: { items: { id: number, text: string, checked: boolean }[] } = { items: [] };


app.listen(port, () => {
    console.log(`TODO's server listening on port ${port}`)
});

app.get('/api/v1/items', (req, res) => {
    res.send(JSON.stringify(todoList))
});

app.post('/api/v1/items', (req, res) => {
    todoList.items.push({ id: ++todoCounter, text: req.body.text, checked: false })
    res.send(JSON.stringify({ id: todoCounter }))
})

app.put('/api/v1/items', (req, res) => {
    let newStatus: boolean = req.body.checked
    let newText: string = req.body.text
    let index: number = todoList.items.findIndex(item => item.id === req.body.id)
    todoList.items[index].checked = newStatus
    todoList.items[index].text = newText
    res.send(JSON.stringify({ ok: true }))
})

app.delete('/api/v1/items', (req, res) => {
    let index: number = todoList.items.findIndex(item => item.id === req.body.id)
    todoList.items.splice(index, 1)
    res.send(JSON.stringify({ ok: true }))
})