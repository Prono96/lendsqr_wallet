import express from 'express';
import { createUser, addFunds } from '../controller/accountController';
import { authenticateToken } from '../auth/authentication';

const router = express.Router();

router.post('/users', createUser);
router.post('/fund', authenticateToken, addFunds);

export default router;