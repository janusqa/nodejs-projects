// WE DO NOT NEED THIS. INSSTEAD USE express-async-errors

const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

export default asyncWrapper;
