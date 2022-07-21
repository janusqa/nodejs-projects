const jobModel = require('../models/Job');
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getJobs = async (req, res) => {
    const jobs = await jobModel
        .find({ createdBy: req.user.userId })
        .sort('createdAt');
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
    const userId = req.user.userId;
    const jobId = req.params.id;
    const job = await jobModel.findOne({ _id: jobId, createdBy: userId });
    if (!job) throw new NotFoundError(`No job with id: ${jobId}`);
    res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await jobModel.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
    // in getJob we just assigned from the different fields in request
    // here we do more inticate destructuring.  for params we alias id to jobId
    const {
        body: { company, position },
        user: { userId },
        params: { id: jobId },
    } = req;

    if (!company || !position)
        throw new BadRequestError('company or position fields cannot be empty');

    const job = await jobModel.findByIdAndUpdate(
        { _id: jobId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
    );

    if (!job) throw new NotFoundError(`No job with id: ${jobId}`);

    res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
    } = req;

    const job = await jobModel.findByIdAndDelete({
        _id: jobId,
        createdBy: userId,
    });

    if (!job) throw new NotFoundError(`No job with id: ${jobId}`);

    res.status(StatusCodes.OK).send();
};

module.exports = { getJobs, getJob, createJob, updateJob, deleteJob };
