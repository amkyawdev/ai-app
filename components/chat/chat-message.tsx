'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Bot, User, Zap, Copy, Check } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  tokens?: number;
  isComplete?: boolean;
  error?: string;
}

interface ChatMessageProps {
  message: Message;
  showStats?: boolean;
}

export function ChatMessage({ message, showStats = false }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const copyContent = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle error messages
  if (message.error) {
    return (
      <div className='flex gap-4 mb-6'>
        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-500/20'>
          <Bot className='h-5 w-5 text-red-400' />
        </div>
        <div className='flex-1 max-w-[80%]'>
          <div className='inline-block p-4 rounded-2xl glass-card text-red-400 border-red-500/20'>
            {message.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-4 mb-6 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
        isUser 
          ? 'bg-white/10' 
          : 'bg-gradient-to-br from-[#00f2ff]/20 to-[#8b5cf6]/20'
      }`}>
        {isUser ? (
          <User className='h-5 w-5 text-white' />
        ) : (
          <Bot className='h-5 w-5 text-[#00f2ff]' />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[80%] ${isUser ? 'text-right' : ''}`}>
        <div className={`relative inline-block p-4 rounded-2xl ${
          isUser 
            ? 'bg-white/10 text-white' 
            : 'glass-card text-zinc-100'
        }`}>
          {!isUser && message.content && (
            <button
              onClick={copyContent}
              className='absolute top-2 right-2 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100'
              title='Copy response'
            >
              {copied ? (
                <Check className='h-3.5 w-3.5 text-green-400' />
              ) : (
                <Copy className='h-3.5 w-3.5 text-[#a1a1aa]' />
              )}
            </button>
          )}
          
          <div className='prose prose-invert prose-sm max-w-none'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {message.content || '...'}
            </ReactMarkdown>
          </div>
        </div>

        {/* Message Footer */}
        <div className={`flex items-center gap-3 mt-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
          {message.timestamp && (
            <p className='text-xs text-[#a1a1aa]'>
              {message.timestamp.toLocaleTimeString()}
            </p>
          )}
          
          {/* Stream Stats */}
          {!isUser && showStats && message.tokens !== undefined && message.isComplete && (
            <div className='flex items-center gap-1 text-xs text-[#00f2ff]'>
              <Zap className='h-3 w-3' />
              <span>{message.tokens} tokens</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
