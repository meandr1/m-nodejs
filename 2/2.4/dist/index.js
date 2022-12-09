"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
const express_session_1 = __importDefault(require("express-session"));
const session_file_store_1 = __importDefault(require("session-file-store"));
const FileStore = (0, session_file_store_1.default)(express_session_1.default);
const app = (0, express_1.default)();
const port = 3005;
const client = new mongodb_1.MongoClient("mongodb://127.0.0.1:27017/");
const counterValue = client.db("todos").collection("counter");
const todoList = client.db("todos").collection("items");
let todoCounter;
app.use(express_1.default.static(path_1.default.join(__dirname, '../static')));
app.use((0, cors_1.default)({
    origin: 'http://localhost:3005',
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
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
    counterValue.find().next().then((cnt) => {
        if (cnt === null) {
            todoCounter = 0;
            counterValue.insertOne({ counter: 0 });
        }
        else {
            todoCounter = cnt.counter;
        }
    });
    app.listen(port, () => {
        console.log(`TODO's server listening on port ${port}`);
    });
});
app.get('/api/v1/items', (req, res) => {
    let username = req.session.username;
    if (username) {
        try {
            todoList.findOne({ username }).then(user => {
                res.send({ items: user === null || user === void 0 ? void 0 : user.items });
            });
        }
        catch (err) {
            res.status(500).send({ "error": `${err.message}` });
        }
    }
    else {
        res.send({ error: 'forbidden' });
    }
});
app.post('/api/v1/login', (req, res) => {
    let username = req.body.login;
    let pass = req.body.pass;
    todoList.findOne({ username, pass }).then(user => {
        if (user) {
            req.session.username = username;
            res.send({ ok: true });
        }
        else {
            res.status(401).send({ error: "User not found or password is incorrect" });
        }
    });
});
app.post('/api/v1/logout', (req, res) => {
    req.session.destroy(err => {
        if (err)
            res.status(500).send({ "error": `${err.message}` });
        else
            res.send({ ok: true });
    });
});
app.post('/api/v1/register', (req, res) => {
    let username = req.body.login;
    let pass = req.body.pass;
    todoList.findOne({ username }).then(user => {
        if (!user) {
            todoList.insertOne({ username, pass, items: [] }).then(result => {
                if (result.acknowledged) {
                    req.session.username = username;
                    res.send({ ok: true });
                }
                else
                    res.status(500).send({ "error": "Failed to add user" });
            });
        }
        else
            res.status(403).send({ error: "User with such name already registered" });
    });
});
app.post('/api/v1/items', (req, res) => {
    try {
        todoList.updateOne({ username: req.session.username }, { $push: { items: { id: ++todoCounter, text: req.body.text, checked: false } } })
            .then(itemUpdateRes => {
            counterValue.updateOne({ counter: todoCounter - 1 }, { $set: { counter: todoCounter } })
                .then(cntUpdateResult => {
                if (cntUpdateResult.modifiedCount && itemUpdateRes.modifiedCount)
                    res.send({ id: todoCounter });
                else
                    res.status(500).send({ "error": "Failed to add item" });
            });
        });
    }
    catch (err) {
        res.status(500).send({ "error": `${err.message}` });
    }
});
app.put('/api/v1/items', (req, res) => {
    let newStatus = req.body.checked;
    let newText = req.body.text;
    let itemID = req.body.id;
    let username = req.session.username;
    try {
        todoList.updateOne({ username }, { $set: { 'items.$[item]': { id: itemID, text: newText, checked: newStatus } } }, { arrayFilters: [{ "item.id": itemID }] }).then(updateResult => {
            if (updateResult.modifiedCount)
                res.send({ ok: true });
            else
                res.status(500).send({ "error": "Failed to update item" });
        });
    }
    catch (err) {
        res.status(500).send({ "error": `${err.message}` });
    }
});
app.delete('/api/v1/items', (req, res) => {
    let itemID = req.body.id;
    let username = req.session.username;
    try {
        todoList.updateOne({ username }, { $pull: { items: { id: itemID } } })
            .then(updateResult => {
            if (updateResult.modifiedCount)
                res.send({ ok: true });
            else
                res.status(500).send({ "error": "Failed to update item" });
        });
    }
    catch (err) {
        res.status(500).send({ "error": `${err.message}` });
    }
});
