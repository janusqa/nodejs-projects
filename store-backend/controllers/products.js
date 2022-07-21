import productModel from '../models/product.js';

export const getProductsStatic = async (req, res, next) => {
    const products = await productModel.find({});
    res.status(200).json({ products, nbHits: products.length });
};

export const getProducts = async (req, res, next) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const query = {};

    if (featured) query.featured = featured === 'true' ? true : false;
    if (company) query.company = company;
    if (name) query.name = { $regex: name, $options: 'i' };
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq',
        };
        const regEx = /\b(<|<=|>|>=|=)\b/g;
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        );
        const options = ['price', 'rating'];
        filters = filters
            .split(',')
            .map((filter) => filter.trim())
            .forEach((filter) => {
                const [field, operator, value] = filter
                    .split('-')
                    .map((part) => part.trim());
                if (options.includes(field)) {
                    query[field] = { [operator]: Number(value) };
                }
            });
    }

    let userQuery = productModel.find(query);

    if (sort) {
        const sortBy = sort
            .split(',')
            .map((col) => col.trim())
            .join(' ');
        userQuery = userQuery.sort(sortBy);
    } else {
        userQuery = userQuery.sort('createdAt');
    }

    if (fields) {
        const selectFields = fields
            .split(',')
            .map((col) => col.trim())
            .join(' ');
        userQuery = userQuery.select(selectFields);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await userQuery.skip(skip).limit(limit);

    res.status(200).json({ products, nbHits: products.length });
};
