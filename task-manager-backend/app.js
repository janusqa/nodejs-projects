import express from 'express';
import path from 'path';
import connectDB, { connectionString } from './db/connect.js';
import taskRouter from './routes/tasks.js';
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/err-handler.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve('./public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1/tasks', taskRouter);

app.get('/', (req, res) => {
    res.status(200).send('Task Manager App');
});

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(connectionString);
        app.listen(port, () =>
            console.log(`Server listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
