'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Plus, Loader2, Trash2, Menu, Zap, Copy, Check } from 'lucide-react';
import { ChatMessage } from './chat-message';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokens?: number;
  isComplete?: boolean;
  error?: string;
};

interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
}

interface StreamData {
  type: 'token' | 'done' | 'error';
  content?: string;
  tokens?: number;
  message?: string;
}

export default function ChatShell() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [streamStats, setStreamStats] = useState<{ tokens: number; speed: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamStartTime = useRef<number>(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const parseStreamData = (text: string): StreamData[] => {
    const results: StreamData[] = [];
    const dataRegex = /【DATA:({.*?})】/g;
    let match;
    
    while ((match = dataRegex.exec(text)) !== null) {
      try {
        results.push(JSON.parse(match[1]));
      } catch (e) {
        // Skip invalid JSON
      }
    }
    return results;
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setStreamStats(null);
    streamStartTime.current = Date.now();

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      tokens: 0,
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      abortControllerRef.current = new AbortController();
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader available');

      const decoder = new TextDecoder();
      let assistantContent = '';
      let totalTokens = 0;
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        
        const streamData = parseStreamData(buffer);
        for (const data of streamData) {
          if (data.type === 'token' && data.content) {
            assistantContent += data.content;
            totalTokens = data.tokens || totalTokens;
            
            setMessages(prev => 
              prev.map((m) => 
                m.id === assistantMessage.id 
                  ? { ...m, content: assistantContent, tokens: totalTokens } 
                  : m
              )
            );
          } else if (data.type === 'done') {
            totalTokens = data.tokens || totalTokens;
            setMessages(prev => 
              prev.map((m) => 
                m.id === assistantMessage.id 
                  ? { ...m, isComplete: true, tokens: totalTokens } 
                  : m
              )
            );
          } else if (data.type === 'error') {
            setMessages(prev => 
              prev.map((m) => 
                m.id === assistantMessage.id 
                  ? { ...m, error: data.message, isComplete: true } 
                  : m
              )
            );
          }
        }
        
        const lastEndIndex = buffer.lastIndexOf('】');
        if (lastEndIndex !== -1) {
          buffer = buffer.substring(lastEndIndex + 1);
        }
      }

      const elapsed = (Date.now() - streamStartTime.current) / 1000;
      const speed = elapsed > 0 ? `${Math.round(totalTokens / elapsed)} tok/s` : '...';
      setStreamStats({ tokens: totalTokens, speed });

    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to get response';
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${errorMessage}`,
        timestamp: new Date(),
        isComplete: true,
        error: errorMessage,
      }]);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const cancelStream = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const newChat = () => {
    if (currentChatId && messages.length > 0) {
      const title = messages[1]?.content?.slice(0, 30) || 'New Chat';
      setHistory(prev => [{
        id: currentChatId,
        title,
        messages: messages,
      }, ...prev]);
    }
    setCurrentChatId(null);
    setMessages([]);
    setStreamStats(null);
  };

  const loadChat = (chatId: string) => {
    const chat = history.find(h => h.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className='flex h-[calc(100vh-64px)]'>
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-0'} glass border-r border-white/10 transition-all overflow-hidden`}>
        <div className='p-4 h-full flex flex-col w-72'>
          <button
            onClick={newChat}
            className='flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#00f2ff]/10 to-[#8b5cf6]/10 text-[#00f2ff] font-medium hover:from-[#00f2ff]/20 hover:to-[#8b5cf6]/20 transition-all'
          >
            <Plus size={18} />
            <span>New Chat</span>
          </button>

          <div className='mt-6 flex-1 overflow-y-auto space-y-2'>
            {history.length === 0 ? (
              <p className='text-sm text-[#a1a1aa]'>No conversations yet</p>
            ) : (
              history.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => loadChat(chat.id)}
                  className='flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors'
                >
                  <span className='text-sm text-[#a1a1aa] truncate'>{chat.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setHistory(prev => prev.filter(h => h.id !== chat.id));
                    }}
                    className='p-1 hover:bg-white/10 rounded'
                  >
                    <Trash2 size={14} className='text-[#a1a1aa]' />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </aside>

      {/* Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className='absolute left-4 top-20 z-10 p-2 glass rounded-lg hover:bg-white/10 transition-colors'
      >
        <Menu className={`w-4 h-4 text-white transition-transform ${isSidebarOpen ? '' : 'rotate-180'}`} />
      </button>

      {/* Main Chat Area */}
      <main className='flex-1 flex flex-col'>
        {/* Messages */}
        <div className='flex-1 overflow-y-auto p-4 sm:p-6'>
          {messages.length === 0 && (
            <div className='flex flex-col items-center justify-center h-full text-center'>
              <div className='mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00f2ff] to-[#8b5cf6]'>
                <Zap className='h-10 w-10 text-black' />
              </div>
              <h2 className='mb-2 text-2xl font-bold text-white'>Welcome to Amkyaw AI</h2>
              <p className='text-[#a1a1aa] max-w-md'>
                Start a conversation with your AI assistant. Ask questions, get help, or simply chat.
              </p>
            </div>
          )}

          {messages.map((message) => {
            const shouldShowStats = message.role === 'assistant' && (!!message.isComplete || !!message.tokens);
            return (
              <ChatMessage 
                key={message.id} 
                message={message}
                showStats={shouldShowStats}
              />
            );
          })}

          {/* Stream Stats */}
          {isLoading && streamStats && (
            <div className='flex items-center gap-4 ml-14 mt-2'>
              <div className='flex items-center gap-2 text-xs text-[#00f2ff]'>
                <Zap className='h-3 w-3' />
                <span>{streamStats.tokens} tokens</span>
              </div>
              <span className='text-xs text-[#a1a1aa]'>{streamStats.speed}</span>
            </div>
          )}

          {isLoading && !streamStats && (
            <div className='flex items-center gap-3 ml-14 mt-2'>
              <Loader2 className='h-4 w-4 animate-spin text-[#00f2ff]' />
              <span className='text-sm text-[#a1a1aa]'>Streaming...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className='border-t border-white/10 p-4'>
          <div className='mx-auto max-w-3xl'>
            <div className='glass-card flex items-end gap-3 p-3'>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder='Type your message...'
                className='flex-1 bg-transparent text-white placeholder-[#a1a1aa] resize-none focus:outline-none min-h-[48px] max-h-32'
                rows={1}
              />
              {isLoading ? (
                <button
                  onClick={cancelStream}
                  className='p-3 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all'
                >
                  <span className='text-xs'>Stop</span>
                </button>
              ) : (
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className={`p-3 rounded-xl transition-all ${
                    input.trim()
                      ? 'bg-gradient-to-r from-[#00f2ff] to-[#00d4e0] text-black hover:shadow-[0_0_20px_rgba(0,242,255,0.4)]'
                      : 'bg-white/10 text-[#a1a1aa] cursor-not-allowed'
                  }`}
                >
                  <Send size={20} />
                </button>
              )}
            </div>
            <div className='flex items-center justify-between mt-2'>
              <p className='text-xs text-[#a1a1aa]'>
                AI can make mistakes. Verify important information.
              </p>
              {streamStats && (
                <div className='text-xs text-[#00f2ff] flex items-center gap-1'>
                  <Check className='h-3 w-3' />
                  <span>Complete • {streamStats.tokens} tokens</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
