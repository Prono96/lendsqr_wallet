import express from 'express';
import { createUser, addFunds, transfer } from '../controller/accountController';
import { authenticateToken } from '../auth/authentication';

const router = express.Router();

router.post('/users', createUser);
router.post('/fund', authenticateToken, addFunds);
router.post('/transfer', authenticateToken, transfer);

export default router;