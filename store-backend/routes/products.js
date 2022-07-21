import express from 'express';
import { getProducts, getProductsStatic } from '../controllers/products.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/static', getProductsStatic);

export default router;
