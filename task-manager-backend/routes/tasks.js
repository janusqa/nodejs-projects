import express from 'express';
import {
    getTasks,
    createTask,
    getTask,
    editTask,
    deleteTask,
} from '../controllers/tasks.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTask);
router.patch('/:id', editTask);
router.delete('/:id', deleteTask);

export default router;
