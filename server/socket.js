import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Message from './models/Message.js';

export const socketHandler = (io) => {
  // Authentication middleware for sockets
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) return next(new Error('Authentication error'));
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_123');
      socket.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.firstName}`);
    
    // Join a room specific to the user
    socket.join(socket.user._id.toString());
    
    // If admin, join an 'admin' room to receive all user queries
    if (socket.user.role === 'admin') {
      socket.join('admins');
    }

    socket.on('sendMessage', async (data) => {
      try {
        const { text, receiverId } = data; // if receiverId is empty, it's sent to admins
        
        const message = await Message.create({
          sender: socket.user._id,
          receiver: receiverId || null,
          text,
          isAdminMessage: socket.user.role === 'admin'
        });

        // Populate sender info before emitting
        await message.populate('sender', 'firstName lastName role');

        if (socket.user.role === 'admin') {
          // Admin replying to a specific user
          io.to(receiverId).emit('newMessage', message);
          // Also emit to admins so they see it
          io.to('admins').emit('newMessage', message);
        } else {
          // User sending to admins
          io.to('admins').emit('newMessage', message);
          // Echo back to user
          socket.emit('newMessage', message);
        }
      } catch (error) {
        console.error('Socket send error', error);
      }
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.user.firstName}`);
    });
  });
};
