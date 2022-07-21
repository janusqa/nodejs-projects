import express from 'express';
import path from 'path';
import { produce } from 'immer';
import peopleRouter from './routes/people.js';
import authRouter from './routes/auth.js';

const app = express();

app.use(express.static(path.resolve('methods-public')));

// parses data submitted from a form ... www-url-endoded
app.use(express.urlencoded({ extended: false }));

//parses data submitted as json
app.use(express.json());

app.use('/api/people', peopleRouter);
app.use('/login', authRouter);

app.listen(5000, () => console.log('Server is listening on port 5000'));
