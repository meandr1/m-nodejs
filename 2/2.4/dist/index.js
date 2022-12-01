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
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const MongoClient = require("mongodb").MongoClient;
const app = (0, express_1.default)();
const jsonParser = body_parser_1.default.json();
const port = 3005;
const mongoClient = new MongoClient("mongodb://127.0.0.1:27017/");
const db = mongoClient.db("todos");
app.use(express_1.default.static(path_1.default.join(__dirname, '../static')));
app.use((0, cors_1.default)({
    origin: 'http://127.0.0.1:3005',
    credentials: true
}));
let todoCounter;
let todoList = { items: [] };
app.listen(port, () => {
    console.log(`TODO's server listening on port ${port}`);
});
app.get('/api/v1/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoClient.connect();
    let items = db.collection("items");
    res.send(JSON.stringify(items));
    yield mongoClient.close();
}));
app.post('/api/v1/items', jsonParser, (req, res) => {
});
app.put('/api/v1/items', jsonParser, (req, res) => {
});
app.delete('/api/v1/items', jsonParser, (req, res) => {
});
