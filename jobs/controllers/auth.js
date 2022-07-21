const userModel = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
    // to see how JWT AND BCRYPT is set up
    // look into /models/User.js.
    // We use mongoose middleware to do the bcrypt
    // and instance methods there to do the JWT
    const user = await userModel.create(req.body);
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        throw new BadRequestError('Please provide email and password');

    const user = await userModel.findOne({ email });

    if (!user) throw new UnauthenticatedError('Invalid Credentials');

    // Now authenticate user by checking their provided password against db password
    const isAuthenticated = await user.comparePassword(password);

    if (!isAuthenticated) throw new UnauthenticatedError('Invalid Credentials');

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { login, register };
