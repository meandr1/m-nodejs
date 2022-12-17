"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
var Buttons;
(function (Buttons) {
    Buttons["plus"] = "plus";
    Buttons["minus"] = "minus";
})(Buttons || (Buttons = {}));
app.use(express_1.default.static(__dirname + '/static'));
let plus = 0;
let minus = 0;
app.post('/', (req, res) => {
    let query = req.query.action;
    if (query == Buttons.plus) {
        res.send({ 'plus': ++plus });
    }
    else {
        res.send({ 'minus': ++minus });
    }
});
app.listen(port);
