const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !/^Bearer /g.test(authorization))
        throw new UnauthenticatedError('Unauthenticated user');

    const token = authorization.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // token verfified add token payload which in this case
        // is just user info to the req object and pass it on
        // to the route/next middleware
        req.user = { userId: payload.userId, name: payload.name };
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
};

module.exports = auth;
