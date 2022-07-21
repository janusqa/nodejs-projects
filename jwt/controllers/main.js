const { BadRequestError } = require('../errors/index');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username.trim() || !password.trim()) {
        throw new BadRequestError('Please provide email and password');
    }

    // for a user id we would usually get one differentnly, for example from a DB
    // but here to keep things simple we will just use current date/time
    const id = new Date().getDate();

    // for secret key can use "openssl rand 256 | base64"
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ msg: 'User created', token });
};

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        msg: `Hello, ${req.user.username}`,
        secret: `Here is your authorized data. Your lucky number is ${luckyNumber} `,
    });
};

module.exports = { login, dashboard };
