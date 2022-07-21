import express from 'express';
import 'express-async-errors';
import connectDB, { connectionString } from './db/connect.js';
import notFound from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import productRouter from './routes/products.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send(
        '<h1>Store API</h1><p><a href="api/v1/products">products route</a></p>'
    );
});

app.use('/api/v1/products', productRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(connectionString);
        console.log('Connected to DB.');
        app.listen(port, () =>
            console.log(`Server listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
