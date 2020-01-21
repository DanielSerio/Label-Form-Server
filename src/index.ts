require('dotenv').config();
import express = require('express');
import cors = require('cors');
import db from './db';
import routes from './routes/label-form.routes';

const PORT: number = +(process.env.PORT as string) || 3001;

db;

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(PORT, () => console.log(`Running @ http://127.0.0.1:${PORT}`));