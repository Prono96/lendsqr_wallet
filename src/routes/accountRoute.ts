import express from 'express';
import { createUser } from '../controller/accountController';
import { authenticateToken } from '../auth/authentication';

const router = express.Router();

router.post('/users', createUser);

export default router;