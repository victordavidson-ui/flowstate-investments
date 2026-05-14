import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '@/contexts/AuthContext';
import { X, Send, User, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const LiveChat = () => {
  const { user, token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only connect if user is logged in and chat is open
    if (isOpen && token && !socketRef.current) {
      // Use the same host as the current window but port 5000 for backend
      const socketUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:5000' 
        : `${window.location.protocol}//${window.location.hostname}:5000`;

      console.log('Connecting to Chat Server at:', socketUrl);
      
      const socket = io(socketUrl, {
        auth: { token },
        transports: ['websocket', 'polling'] // Ensure compatibility
      });

      socket.on('connect', () => {
        console.log('Connected to Chat Server');
      });

      socket.on('connect_error', (err) => {
        console.error('Chat Connection Error:', err.message);
      });

      socket.on('newMessage', (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      socketRef.current = socket;
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [isOpen, token]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !socketRef.current) return;

    socketRef.current.emit('sendMessage', { text: message });
    setMessage('');
  };

  if (!user) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 hidden lg:block">
        <button 
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-success rounded-full border-2 border-background animate-pulse" />
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] md:w-96 h-[500px] glass-strong border border-border/40 rounded-3xl shadow-elevated z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-primary/10 border-b border-border/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-glow">
                <User className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold">Netflow Support</div>
                <div className="text-[10px] text-primary flex items-center gap-1 uppercase tracking-wider font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  Live Chat Active
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/5">
            {messages.length === 0 && (
              <div className="text-center py-12 px-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-sm mb-1">Welcome back!</h3>
                <p className="text-xs text-muted-foreground">How can we assist you with your investments today?</p>
              </div>
            )}
            
            {messages.map((msg, i) => {
              const isMe = msg.sender?._id === user.id || msg.sender === user.id;
              return (
                <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                    isMe 
                      ? 'bg-primary text-primary-foreground rounded-tr-none' 
                      : 'bg-muted rounded-tl-none border border-border/40'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-border/40 bg-background/50 flex gap-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-muted/40 border-none rounded-xl px-4 py-2 text-sm focus:ring-1 focus:ring-primary outline-none transition-all"
            />
            <Button size="icon" type="submit" className="rounded-xl shadow-glow">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};
