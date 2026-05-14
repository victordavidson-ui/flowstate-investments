import express from 'express';
import { 
  registerUser, 
  authUser as loginUser, 
  getUserProfile,
  verifyEmail,
  forgotPassword,
  resetPassword 
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.route('/profile').get(protect, getUserProfile);

export default router;
