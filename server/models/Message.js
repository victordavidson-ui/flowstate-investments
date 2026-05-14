import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // If receiver is null, it might be a general broadcast, or sent to 'admin'
    },
    text: {
      type: String,
      required: true,
    },
    isAdminMessage: {
      type: Boolean,
      default: false,
    },
    read: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
