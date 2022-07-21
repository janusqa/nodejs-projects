// const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'Something went wrong, try again later',
    };

    // if (err instanceof CustomAPIError) {
    //     return res.status(err.statusCode).json({ msg: err.message });
    // }

    if (err.code && err.code === 11000) {
        // MongoDB duplicate index/key error
        customError.message = `Duplicate value entered for ${Object.keys(
            err.keyValue
        )} field, please choose another value`;
        customError.statusCode = 400;
    }

    if (err.name && err.name === 'ValidationError') {
        // MongoDB validation error
        customError.message = Object.values(err.errors)
            .map((item) => item.message)
            .join(', and ');
        customError.statusCode = 400;
    }

    if (err.name && err.name === 'CastError') {
        // MongoDB cast error
        customError.message = `No item found with ID: ${err.value}`;
        customError.statusCode = 404;
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });

    return res
        .status(customError.statusCode)
        .json({ msg: customError.message });
};

module.exports = errorHandlerMiddleware;
