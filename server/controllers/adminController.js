import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Edit user balance
// @route   PUT /api/admin/users/:id/balance
// @access  Private/Admin
export const updateUserBalance = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.balance = req.body.balance !== undefined ? Number(req.body.balance) : user.balance;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all transactions
// @route   GET /api/admin/transactions
// @access  Private/Admin
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({}).populate('user', 'id firstName lastName email');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update transaction status
// @route   PUT /api/admin/transactions/:id/status
// @access  Private/Admin
export const updateTransactionStatus = async (req, res) => {
  try {
    const { status, finalAmount } = req.body; // finalAmount for deposit confirmation
    const transaction = await Transaction.findById(req.params.id);

    if (transaction) {
      transaction.status = status || transaction.status;
      if (finalAmount) {
        transaction.amount = Number(finalAmount);
      }
      const updatedTransaction = await transaction.save();

      // If approved, update user balance
      if (status === 'completed') {
        const user = await User.findById(transaction.user);
        if (user) {
          if (transaction.type === 'deposit') {
            user.balance += transaction.amount;
          } else if (transaction.type === 'withdrawal') {
            user.balance -= transaction.amount;
          }
          await user.save();
        }
      }

      res.json(updatedTransaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
