import express, { Express } from 'express';
import { router } from './routers/router'
import path from 'path';
const app: Express = express();
const port: number = 3000;

app.use(express.static(path.resolve(__dirname, '../views')));
app.use(router);
app.set('view-engine', 'ejs')

app.listen(port, () => {
    console.log(`Library's server listening on port ${port}`)
});