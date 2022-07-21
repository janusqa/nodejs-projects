import express from 'express';
import { createPerson, getPeople } from '../controllers/people.js';

const router = express.Router();

router.get('/', getPeople);
router.post('/', createPerson);

// Alternative way to set up routing using chaining based on the path
// router.route('/').get(getPeople).post(createPerson)
// router.route('/:id').put(updatePerson).delete(deletePerson)

export default router;
