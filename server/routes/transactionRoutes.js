import express from 'express';
import { 
  getWallets, 
  createDeposit, 
  createWithdrawal, 
  getMyTransactions 
} from '../controllers/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/wallets').get(protect, getWallets);
router.route('/deposit').post(protect, createDeposit);
router.route('/withdraw').post(protect, createWithdrawal);
router.route('/my').get(protect, getMyTransactions);

export default router;
