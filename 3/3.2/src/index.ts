import express, { Request, Response, Express } from 'express';
import path from 'path';
import {books} from './books'
const app: Express = express();
const port: number = 3000;

const createPath = (fileName: string) => path.resolve(__dirname, '..', 'static', `${fileName}.ejs`)

app.use(express.static(path.join(__dirname, '../static')));

app.set('view-engine', 'ejs')

app.get('/', (req, res) => {
    res.render(createPath('books-page'), { books })
});

app.get('/book/*', (req,res)=>{
    let id: number = +req.url.substring('/book/'.length)

    console.log(req.url);

    res.render(createPath('book-page'))
})

app.listen(port, () => {
    console.log(`Library's server listening on port ${port}`)
});