import express, { Express } from 'express';
import { router } from './routers/router'
import { resolve } from 'path';
import fileUpload from 'express-fileupload';
import { initializeDB } from './helpers/migrate';
import startCron from './models/cron';

const app: Express = express();
const PORT: number = 3000;

app.use(fileUpload());
app.use(express.static(resolve(__dirname, '../views')));
app.use(express.urlencoded({ extended: false }));
app.set('view-engine', 'ejs');
app.use(router);

initializeDB();
startCron();

app.listen(PORT, () => {
    console.log(`Library's server listening on port ${PORT}`);
});