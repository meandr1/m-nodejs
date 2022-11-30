"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const jsonParser = body_parser_1.default.json();
const port = 3005;
app.use(express_1.default.static(path_1.default.join(__dirname, '../static')));
app.use((0, cors_1.default)({
    origin: 'http://127.0.0.1:3005',
    credentials: true
}));
let todoCounter = 1;
const todoList = { items: [] };
app.listen(port, () => {
    console.log(`TODO's server listening on port ${port}`);
});
app.get('/api/v1/items', (req, res) => {
    res.send(JSON.stringify(todoList));
});
app.post('/api/v1/items', jsonParser, (req, res) => {
    todoList.items.push({ id: todoCounter++, text: req.body.text, checked: false });
    res.send(JSON.stringify({ id: todoCounter - 1 }));
});
app.put('/api/v1/items', jsonParser, (req, res) => {
    let newStatus = req.body.checked;
    let newText = req.body.text;
    let index = todoList.items.findIndex(item => item.id === req.body.id);
    if (newStatus !== todoList.items[index].checked) {
        todoList.items[index].checked = newStatus;
    }
    else if (newText !== todoList.items[index].text) {
        todoList.items[index].text = newText;
    }
    res.send(JSON.stringify({ ok: true }));
});
app.delete('/api/v1/items', jsonParser, (req, res) => {
    let index = todoList.items.findIndex(item => item.id === req.body.id);
    todoList.items.splice(index, 1);
    res.send(JSON.stringify({ ok: true }));
});
