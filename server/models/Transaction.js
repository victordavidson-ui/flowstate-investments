import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    type: {
      type: String,
      required: true,
      enum: ['deposit', 'withdrawal', 'transfer', 'trade'],
    },
    amount: {
      type: Number,
      required: true,
    },
    asset: {
      type: String, // e.g. 'BTC', 'ETH', 'USDT'
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'completed', 'failed', 'rejected'],
      default: 'pending',
    },
    txHash: {
      type: String, // User submits this for deposits, admin provides for withdrawals
    },
    walletAddress: {
      type: String, // The address they deposited to, or are withdrawing to
    }
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
