import express, { Express } from 'express';
import { router } from './routers/router'
import { resolve } from 'path';
const app: Express = express();
const PORT: number = 3000;

app.use(express.static(resolve(__dirname, '../views')));
app.set('view-engine', 'ejs');
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Library's server listening on port ${PORT}`);
});