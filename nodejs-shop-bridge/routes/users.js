import express from 'express'
import { createUser, getUser, getUsers, loginUser, updatedUser } from '../controllers/users.js';

const router = express.Router();

router.get('/', getUsers); // -- @TODO should not be accesable from the UI(for test purpose)
router.get('/:id', getUser);
router.put('/:id', updatedUser);
router.post('/', createUser);
router.post('/login', loginUser);

export default router;
