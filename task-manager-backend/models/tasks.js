import mongoose from 'mongoose';

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide title.'],
        trim: true,
        maxlength: [20, 'Title should have maximum length of 20 characters'],
    },
    completed: { type: Boolean, default: false },
});

const tasksModel = mongoose.model('Task', TaskSchema);

export default tasksModel;
