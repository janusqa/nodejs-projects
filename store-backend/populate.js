import 'dotenv/config';
import productModel from './models/product.js';
import connectDB, { connectionString, disconnectDB } from './db/connect.js';
import jsonProducts from './products.json' assert { type: 'json' };

const bootStrapProductsDB = async () => {
    try {
        await connectDB(connectionString);
        console.log('Connected to DB...');
        await productModel.deleteMany();
        await productModel.insertMany(jsonProducts);
        console.log('Successfully uploaded products to DB');
        await disconnectDB();
    } catch (error) {
        console.log(error);
        await disconnectDB();
    }
};

bootStrapProductsDB();
