'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { User, Bot } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
          isUser ? 'bg-[#8b5cf6]' : 'bg-gradient-to-br from-[#00f2ff] to-[#8b5cf6]'
        }`}
      >
        {isUser ? (
          <User size={16} className="text-white" />
        ) : (
          <Bot size={16} className="text-black" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
          isUser ? 'bg-[#8b5cf6]/20' : 'glass'
        }`}
      >
        {!isUser ? (
          <ReactMarkdown
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                const isInline = !match;
                return !isInline ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg mt-2"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className="bg-white/10 px-1.5 py-0.5 rounded text-sm text-[#00f2ff]"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              p: ({ children }) => (
                <p className="text-white/90 leading-relaxed mb-2 last:mb-0">{children}</p>
              ),
              h1: ({ children }) => (
                <h1 className="text-xl font-bold text-white mb-2">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-lg font-bold text-white mb-2">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-base font-semibold text-white mb-1">{children}</h3>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-white/90 mb-2 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside text-white/90 mb-2 space-y-1">{children}</ol>
              ),
              li: ({ children }) => <li className="text-white/90">{children}</li>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-[#00f2ff] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-[#8b5cf6] pl-4 italic text-white/70 my-2">
                  {children}
                </blockquote>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        ) : (
          <p className="text-white/90">{message.content}</p>
        )}
      </div>
    </motion.div>
  );
}