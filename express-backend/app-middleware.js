import express from 'express';
import path from 'path';
import { produce } from 'immer';
import logger, { apiogger } from './app-middleware-logger.js';
import authorize from './app-middleware-authorize.js';
import morgan from 'morgan';

const app = express();

// when using multiple middleware must pass array to app.use instead of a scalar
app.use([logger, morgan('tiny')]);

//can target middle ware towards specific routes with additional argument for target route
app.use('/api', apiogger);

app.get('/', (req, res) => {
    res.status(200).send('Home');
});

app.get('/about', (req, res) => {
    res.status(200).send('About');
});

app.get('/api/products', authorize, (req, res) => {
    console.log(req.user);
    res.status(200).send('Products API');
});

app.listen(5000, () => console.log('Server is listening on port 5000'));
