"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const mongodb_1 = require("mongodb");
const app = (0, express_1.default)();
const port = 3005;
const client = new mongodb_1.MongoClient("mongodb://127.0.0.1:27017/");
const todoList = client.db("todos").collection("items");
const counterValue = client.db("todos").collection("counter");
let todoCounter;
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../static')));
app.use((0, cors_1.default)({
    origin: 'http://127.0.0.1:3005',
    credentials: true
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
app.get('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send({ items: yield todoList.find().toArray() });
    }
    catch (err) {
        res.status(500).send({ "error": `${err.message}` });
    }
}));
app.post('/api/v1/items', (req, res) => {
    try {
        todoList.insertOne({ id: ++todoCounter, text: req.body.text, checked: false }).then(insertRes => {
            counterValue.updateOne({ counter: todoCounter - 1 }, { $set: { counter: todoCounter } }).then(updateResult => {
                if (updateResult.modifiedCount && insertRes.acknowledged)
                    res.send(JSON.stringify({ id: todoCounter }));
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
    try {
        todoList.updateOne({ id: req.body.id }, { $set: { text: newText, checked: newStatus } }).then(updateResult => {
            if (updateResult.modifiedCount)
                res.send(JSON.stringify({ ok: true }));
            else
                res.status(500).send({ "error": "Failed to update item" });
        });
    }
    catch (err) {
        res.status(500).send({ "error": `${err.message}` });
    }
});
app.delete('/api/v1/items', (req, res) => {
    try {
        todoList.deleteOne({ id: req.body.id }).then(delResult => {
            if (delResult.deletedCount)
                res.send(JSON.stringify({ ok: true }));
            else
                res.status(500).send({ "error": "Failed to delete item" });
        });
    }
    catch (err) {
        res.status(500).send({ "error": `${err.message}` });
    }
});
