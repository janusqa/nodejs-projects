require('express-async-errors');
require('dotenv').config();
const express = require('express');
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
const { connectionString, connectDB } = require('./db/connect');
const authMiddleware = require('./middleware/authentication');

//Swagger
const swaggerUI = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocumentation = yaml.load('./swagger.yaml');

// security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1); // used in conjuction with ratelimit if behind a proxy like heroku
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 mins
        max: 100, // limit each IP to 100 request per windowMs
    })
);
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(express.json());
// extra packages

// routes
// app.get('/', (req, res) => {
//     res.send('jobs api');
// });

app.get('/', (req, res) =>
    res
        .status(200)
        .send(
            '<h1>Jobs API</h1><p><a href="/api/docs">API documentation</a></p>'
        )
);

// SWAGGER
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authMiddleware, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(connectionString);
        console.log(`Connected to DB`);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
