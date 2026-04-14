'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Loader2, Plus, Trash2 } from 'lucide-react';
import MessageBubble from './MessageBubble';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamedContent, setStreamedContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamedContent]);

  // Save chat to history
  const saveToHistory = (msgs: Message[]) => {
    const title = msgs[0]?.content?.slice(0, 30) || 'New Chat';
    const chatId = currentChatId || Date.now().toString();
    
    const newChat: ChatHistory = {
      id: chatId,
      title: `${title}...`,
      messages: msgs,
      createdAt: new Date(),
    };

    setChatHistory((prev) => {
      if (currentChatId) {
        return prev.map((c) => (c.id === currentChatId ? newChat : c));
      }
      return [newChat, ...prev];
    });
    setCurrentChatId(chatId);
  };

  // Load chat
  const loadChat = (chat: ChatHistory) => {
    setCurrentChatId(chat.id);
    setMessages(chat.messages);
    setStreamedContent('');
  };

  // Delete chat
  const deleteChat = (id: string) => {
    setChatHistory((prev) => prev.filter((c) => c.id !== id));
    if (currentChatId === id) {
      setCurrentChatId(null);
      setMessages([]);
      setStreamedContent('');
    }
  };

  // New chat
  const newChat = () => {
    setCurrentChatId(null);
    setMessages([]);
    setStreamedContent('');
  };

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setStreamedContent('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        fullContent += chunk;
        setStreamedContent(fullContent);
      }

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fullContent,
      };

      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);
      setStreamedContent('');
      saveToHistory(finalMessages);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="h-full glass overflow-hidden flex-shrink-0"
          >
            <div className="p-4 h-full flex flex-col">
              {/* New Chat Button */}
              <button
                onClick={newChat}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-[#00f2ff]/10 text-[#00f2ff] hover:bg-[#00f2ff]/20 transition-colors mb-4"
              >
                <Plus size={18} />
                <span className="font-medium">New Chat</span>
              </button>

              {/* Chat History */}
              <div className="flex-1 overflow-y-auto space-y-2">
                <h3 className="text-xs uppercase text-[#a1a1aa] font-medium mb-2 px-2">
                  Chat History
                </h3>
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                      currentChatId === chat.id
                        ? 'bg-white/10 text-white'
                        : 'text-[#a1a1aa] hover:bg-white/5 hover:text-white'
                    }`}
                    onClick={() => loadChat(chat)}
                  >
                    <span className="flex-1 text-sm truncate">{chat.title}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                {chatHistory.length === 0 && (
                  <p className="text-sm text-[#a1a1aa] px-2">No chats yet</p>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full">
        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-20 left-4 z-10 p-2 glass rounded-lg hover:bg-white/10 transition-colors"
        >
          <svg
            className={`w-5 h-5 transition-transform ${isSidebarOpen ? '' : 'rotate-180'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.length === 0 && !streamedContent && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00f2ff] to-[#8b5cf6] flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h2 className="font-['Outfit'] text-2xl font-bold text-white mb-2">
                Welcome to Amkyaw AI
              </h2>
              <p className="text-[#a1a1aa] max-w-md">
                Start a conversation with your AI assistant. Ask questions, get help, or simply chat.
              </p>
            </div>
          )}

          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {/* Streaming Content */}
          {streamedContent && (
            <MessageBubble
              message={{
                id: 'streaming',
                role: 'assistant',
                content: streamedContent,
              }}
            />
          )}

          {/* Loading Indicator */}
          {isLoading && !streamedContent && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00f2ff] to-[#8b5cf6] flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-black animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
              <div className="glass rounded-2xl px-4 py-3">
                <Loader2 className="w-5 h-5 text-[#00f2ff] animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10">
          <div className="max-w-3xl mx-auto">
            <div className="glass rounded-2xl flex items-end gap-3 p-3">
              {/* File Upload Button */}
              <button className="p-2 text-[#a1a1aa] hover:text-white transition-colors">
                <Paperclip size={20} />
              </button>

              {/* Input Field */}
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-transparent text-white placeholder-[#a1a1aa] resize-none focus:outline-none max-h-32 min-h-[44px]"
                rows={1}
                disabled={isLoading}
              />

              {/* Send Button */}
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className={`p-2 rounded-lg transition-all ${
                  input.trim() && !isLoading
                    ? 'bg-[#00f2ff] text-black hover:bg-[#00e0e6]'
                    : 'bg-white/10 text-[#a1a1aa] cursor-not-allowed'
                }`}
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-[#a1a1aa] text-center mt-2">
              AI can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}