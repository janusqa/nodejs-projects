import express from 'express';
import path from 'path';
import { products } from './data.js';
import { produce } from 'immer';

const app = express();

// app.use(express.static(path.resolve('public')));

app.get('/', (req, res) => {
    res.status(200).send(
        '<h1>Home Page</h1><a href="/api/products">Products</a>'
    );
});

app.get('/api/products', (req, res) => {
    const newProducts = products.map((product) => {
        const { id, name, image } = product;
        return { id, name, image };
    });
    res.status(200).json(newProducts);
});

// route parameters --- looks like :param
app.get('/api/products/:productId', (req, res) => {
    console.log(req.params);

    const { productId } = req.params;
    const product = products.find(
        (product) => product.id === Number(productId)
    );

    if (!product) {
        return res.status(404).send('Product does not exist.');
    }

    res.status(200).json(product);
});

// query params -- these are after the question mark and occur as key/value pairs
app.get('/api/v1/query', (req, res) => {
    console.log(req.query);

    const { search, limit } = req.query;

    let sortedProducts = products;
    if (search) {
        sortedProducts = produce(sortedProducts, (draft) => {
            return draft.filter((product) => product.name.startsWith(search));
        });
    }

    if (limit) {
        sortedProducts = produce(sortedProducts, (draft) =>
            sortedProducts.slice(0, Number(limit))
        );
    }
    res.status(200).json(sortedProducts);
});

// app.all('*', (req, res) => {
//     res.status(404).send('Resource not found.');
// });

app.listen(5000, () => console.log('Server is listening on port 5000'));
