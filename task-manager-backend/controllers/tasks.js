import tasksModel from '../models/tasks.js';
import asyncWrapper from '../middleware/async.js';
import createCustomAPIError from '../errors/CustomAPIError.js';

export const getTasks = asyncWrapper(async (req, res, next) => {
    const tasks = await tasksModel.find({});
    res.status(200).json({ tasks });
});

export const createTask = asyncWrapper(async (req, res, next) => {
    const task = await tasksModel.create(req.body);
    res.status(201).json({ task });
});

export const getTask = asyncWrapper(async (req, res, next) => {
    const task = await tasksModel.findOne({ _id: req.params.id });
    if (!task)
        return next(
            createCustomAPIError(`No task with id: ${req.params.id}`, 404)
        );

    res.status(200).json({ task });
});

export const editTask = asyncWrapper(async (req, res, next) => {
    const task = await tasksModel.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    );
    if (!task)
        return next(
            createCustomAPIError(`No task with id: ${req.params.id}`, 404)
        );
    res.status(201).json({ task });
});

export const deleteTask = asyncWrapper(async (req, res, next) => {
    const task = await tasksModel.findOneAndDelete({ _id: req.params.id });
    if (!task)
        return next(
            createCustomAPIError(`No task with id: ${req.params.id}`, 404)
        );
    res.status(201).json({ task });
});
