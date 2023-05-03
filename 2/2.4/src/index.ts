import express, { Request, Response, Express } from 'express'
import session from 'express-session'
import fileStore, { FileStore } from 'session-file-store'
import cors from 'cors'
import {join} from 'path'
import { setDBconnection } from './controllers/DBcontroller'
import { getItems, editItem, deleteItem, addItem } from './controllers/itemsController'
import { login, logout, register } from './controllers/userController'

declare module 'express-session' {
    interface Session {
        username: string
    }
}

const FileStore: FileStore = fileStore(session)
const app: Express = express()
const port: number = 3005

app.use(express.static(join(__dirname, '../static')))
/* Uncomment this lines if you want to use cors with front-side on other host (static will not be needed) */
// app.use(
//     cors({
//         origin: 'http://localhost:8080',
//         credentials: true
//     })
// );
app.use(express.json())
app.use(session({
    store: new FileStore({ retries: 0 }),
    secret: 'rus - ni, pease - da',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000, //2 hours
    }
}));

app.post('/api/v2/router', (req: Request, res: Response) => {
    let query: string = req.query.action as string
    switch (query) {
        case 'login': {
            login(req, res)
            break;
        }
        case 'logout': {
            logout(req, res)
            break;
        }
        case 'register': {
            register(req, res)
            break;
        }
        case 'getItems': {
            getItems(req, res)
            break;
        }
        case 'deleteItem': {
            deleteItem(req, res)
            break;
        }
        case 'createItem': {
            addItem(req, res)
            break;
        }
        case 'editItem': {
            editItem(req, res)
            break;
        }
        default: res.status(400).send({ error: `Unknown request command: ${query}` })
    }
})

setDBconnection().then(() => {
    app.listen(port, () => {
        console.log(`TODO's server listening on port ${port}`)
    });
})