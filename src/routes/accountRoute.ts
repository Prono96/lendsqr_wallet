import express from 'express';
import { createUser } from '../controller/accountController';

const router = express.Router();

router.post('/users', createUser);

export default router;