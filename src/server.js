import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { resolve } from 'path';
import bodyParser from 'body-parser';

import connection from "./config/db-connection.js"
import HttpException from './utils/HttpException.utils.js';
import userRouter from './routes/user.route.js';

// Init express
const app = express();
// Init environment
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/images', express.static(resolve('public', 'images')))
// app.use('/public', express.static('public'));
// app.use(express.static(path.resolve()));

// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());
const PORT = process.env.PORT || process.env.APP_PORT;

app.use(`/apps/api/web/users`, userRouter);

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

connection();
// starting the server
var server = app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}!`));
server.timeout = 120000;

export default app;