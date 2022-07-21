import 'dotenv/config';
import mongoose from 'mongoose';

export const connectionString = `mongodb+srv://${process.env.MONGODB_UID}:${process.env.MONGODB_PID}@${process.env.MONGODB_SERVER}/${process.env.MONGODB_COLLECTION}?retryWrites=true&w=majority`;

const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
};

export default connectDB;
