const { UnauthorizedError } = require('../errors/index');
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !/^Bearer /g.test(authorization))
        throw new UnauthorizedError('No token provided');

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username } = decoded;
        req.user = { id, username };
        next();
    } catch (error) {
        throw new UnauthorizedError('Not authorized to access this resource');
    }
};

module.exports = authenticationMiddleware;
