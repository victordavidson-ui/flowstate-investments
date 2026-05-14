import express from 'express';
import { 
  getUsers, 
  updateUserBalance, 
  getTransactions, 
  updateTransactionStatus 
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id/balance').put(protect, admin, updateUserBalance);
router.route('/transactions').get(protect, admin, getTransactions);
router.route('/transactions/:id/status').put(protect, admin, updateTransactionStatus);

export default router;
