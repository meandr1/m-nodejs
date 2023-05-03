import express, { Express, Request, Response } from 'express'
const app: Express = express();
const port = 3000

enum Buttons {
    plus = 'plus',
    minus = 'minus'
}

app.use(express.static(__dirname + '/static'))
let plus = 0;
let minus = 0;

app.post('/', (req: Request, res: Response) => {
    let query: Buttons = req.query.action as Buttons
    if (query == Buttons.plus) {
        res.send({ 'plus': ++plus })
    } else {
        res.send({ 'minus': ++minus })
    }
})

app.listen(port);