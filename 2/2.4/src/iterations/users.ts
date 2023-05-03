import express, { Request, Response, Express } from 'express'
import path from 'path'
import cors from 'cors'
import { MongoClient, Collection } from "mongodb"
import session from 'express-session'
import fileStore, { FileStore } from 'session-file-store'
import { Counter, Item, User } from '../types'

declare module 'express-session' {
    interface Session {
        username: string
    }
}

const FileStore: FileStore = fileStore(session)
const app: Express = express()
const port: number = 3005
const client: MongoClient = new MongoClient("mongodb://127.0.0.1:27017/")
const counterValue: Collection = client.db("todos").collection("counter")
const todoList: Collection = client.db("todos").collection("items")
let todoCounter: number;

app.use(express.json())
app.use(express.static(path.join(__dirname, '../static')))
app.use(
    cors({
        origin: 'http://localhost:3005',
        credentials: true
    })
);
app.use(session({
    store: new FileStore({ retries: 0 }),
    secret: 'rus - ni, pease - da',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000, //2 hours
    }
}));

client.connect()
    .then(() => {
        console.log('DB connection established');
        counterValue.findOne<Counter>({ counter: Number }).then((cnt) => {
            if (!cnt) {
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

app.get('/api/v1/items', (req: Request, res: Response) => {
    let username: string = req.session.username
    if (username) {
        try {
            todoList.findOne<User>({ username }).then(user => {
                res.send({ items: user?.items })
            })
        } catch (err) {
            res.status(500).send({ "error": `${(err as Error).message}` })
        }
    } else {
        res.status(403).send({ error: 'forbidden' });
    }
});

app.post('/api/v1/login', (req: Request, res: Response) => {
    let username: string = req.body.login
    let pass: string = req.body.pass
    todoList.findOne<User>({ username, pass }).then(user => {
        if (user) {
            req.session.username = username
            res.send({ ok: true })
        } else {
            res.status(401).send({ error: "not found" })
        }
    })
})

app.post('/api/v1/logout', (req: Request, res: Response) => {
    req.session.destroy(err => {
        if (err) res.status(500).send({ "error": `${(err as Error).message}` })
        else res.send({ ok: true })
    })
})

app.post('/api/v1/register', (req: Request, res: Response) => {
    let username: string = req.body.login
    let pass: string = req.body.pass
    let newUser: User = { username, pass, items: [] }
    todoList.findOne<User>({ username }).then(user => {
        if (!user) {
            todoList.insertOne(newUser).then(result => {
                if (result.acknowledged) {
                    req.session.username = username
                    res.send({ ok: true })
                } else res.status(500).send({ error: "Failed to add user" })
            })
        } else res.status(403).send({ error: "User with such name already registered" })
    })
})

app.post('/api/v1/items', (req: Request, res: Response) => {
    let item: Item = { id: ++todoCounter, text: req.body.text, checked: false }
    let newCounter: Counter = { counter: todoCounter }
    try {
        todoList.updateOne({ username: req.session.username }, { $push: { items: item } })
            .then(itemUpdateRes => {
                counterValue.updateOne({ counter: todoCounter - 1 }, { $set: newCounter })
                    .then(cntUpdateResult => {
                        if (cntUpdateResult.modifiedCount && itemUpdateRes.modifiedCount) res.send({ id: todoCounter })
                        else res.status(500).send({ "error": "Failed to add item" })
                    })
            })
    } catch (err) {
        res.status(500).send({ "error": `${(err as Error).message}` })
    }
})

app.put('/api/v1/items', (req: Request, res: Response) => {
    let item: Item = req.body
    let itemID: number = req.body.id
    let username: string = req.session.username
    try {
        todoList.updateOne({ username }, { $set: { 'items.$[item]': item } },
            { arrayFilters: [{ "item.id": itemID }] }).then(updateResult => {
                if (updateResult.modifiedCount) res.send({ ok: true })
                else res.status(500).send({ "error": "Failed to update item" })
            })
    } catch (err) {
        res.status(500).send({ "error": `${(err as Error).message}` })
    }
})

app.delete('/api/v1/items', (req: Request, res: Response) => {
    let itemID: number = req.body.id
    let username: string = req.session.username
    try {
        todoList.updateOne({ username }, { $pull: { items: { id: itemID } } })
            .then(updateResult => {
                if (updateResult.modifiedCount) res.send({ ok: true })
                else res.status(500).send({ "error": "Failed to update item" })
            })
    } catch (err) {
        res.status(500).send({ "error": `${(err as Error).message}` })
    }
})