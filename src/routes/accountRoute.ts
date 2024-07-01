import express from 'express';
import { createUser, addFunds, transfer, withdraw, deleteUserAccount } from '../controller/accountController';
import { authenticateToken } from '../auth/authentication';

const router = express.Router();

router.post('/users', createUser);
router.post('/fund', authenticateToken, addFunds);
router.post('/transfer', authenticateToken, transfer);
router.post('/withdraw', authenticateToken, withdraw);
router.delete('/delete-user', authenticateToken, deleteUserAccount);

export default router;