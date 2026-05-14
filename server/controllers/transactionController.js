import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

// The permanent wallet addresses provided by the user
const COMPANY_WALLETS = {
  BTC: 'bc1qchf4t2eaz7xu6ltgquwxd5thq8xp8jsrp2wkht',
  ETH: '0xD4D1A811F263F5a5690158d954A0BA4b5b4aed53',
  USDT_TRC20: 'TSyFzCgs42HhNNTdDPWHkiUaavk8CfdQRY',
  USDT_ERC20: '0xD4D1A811F263F5a5690158d954A0BA4b5b4aed53',
  SOL: '6VY4eqFTPkwdC7fht1iWBcjYtpSbEhbL8FyMLmkDXQnP',
  XRP: 'rhczpucHnRbg4k8KePWeeznfbGSmsjyqmB',
  LTC: 'ltc1qxlkas6tda4w047rgxyxxxz0g44575z3xpvjc3j',
  TRX: 'TSyFzCgs42HhNNTdDPWHkiUaavk8CfdQRY'
};

// @desc    Get company wallet addresses
// @route   GET /api/transactions/wallets
// @access  Private
export const getWallets = async (req, res) => {
  res.json(COMPANY_WALLETS);
};

// @desc    Create a new deposit request
// @route   POST /api/transactions/deposit
// @access  Private
export const createDeposit = async (req, res) => {
  try {
    const { amount, asset, txHash, network } = req.body;

    const transaction = await Transaction.create({
      user: req.user._id,
      type: 'deposit',
      amount,
      asset,
      txHash,
      walletAddress: COMPANY_WALLETS[asset] || COMPANY_WALLETS[network],
      status: 'pending'
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new withdrawal request
// @route   POST /api/transactions/withdraw
// @access  Private
export const createWithdrawal = async (req, res) => {
  try {
    const { amount, asset, walletAddress } = req.body;

    // Check KYC status
    if (req.user.kycStatus !== 'verified') {
      return res.status(403).json({ message: 'KYC must be verified to withdraw funds' });
    }

    if (req.user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      type: 'withdrawal',
      amount,
      asset,
      walletAddress,
      status: 'pending'
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's transactions
// @route   GET /api/transactions/my
// @access  Private
export const getMyTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
