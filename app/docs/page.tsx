'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import { ChevronRight, ChevronDown, BookOpen, Code, Zap, Shield, Cpu } from 'lucide-react';

interface DocSection {
  id: string;
  title: string;
  icon: React.ElementType;
  content: string;
}

const docSections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: BookOpen,
    content: `# Getting Started

Welcome to **Amkyaw AI**! This documentation will help you get started with our AI assistant.

## Prerequisites

Before using Amkyaw AI, ensure you have:
- A modern web browser
- An internet connection
- (Optional) A Groq API key for enhanced features

## Quick Start

1. Navigate to the home page
2. Click "Get Started" to open the chat interface
3. Start typing your questions or messages
4. Receive instant AI responses with streaming

## Features

- **Real-time streaming**: Watch responses appear token by token
- **Smart context**: AI remembers your conversation history
- **Markdown support**: Write and read formatted content
- **Code highlighting**: Automatic syntax highlighting for code blocks
`,
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    icon: Code,
    content: `# API Reference

## Chat Endpoint

\`POST /api/chat\`

Send a message to the AI assistant and receive streaming responses.

### Request Body

\`\`\`json
{
  "messages": [
    { "role": "user", "content": "Hello" }
  ]
}
\`\`\`

### Response

The API returns a streaming response with the AI's completion.

### Example

\`\`\`javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [{ role: 'user', content: 'Hello!' }]
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(decoder.decode(value));
}
\`\`\`
`,
  },
  {
    id: 'streaming',
    title: 'Token Streaming',
    icon: Zap,
    content: `# Token Streaming

Amkyaw AI uses **real-time token streaming** to deliver responses as they're generated.

## How It Works

1. User sends a message
2. Server starts generating response
3. Tokens are streamed to the client in real-time
4. UI updates progressively as tokens arrive

## Implementation

The streaming is handled using the \`ReadableStream\` API:

\`\`\`typescript
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ messages })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  const chunk = decoder.decode(value);
  // Process chunk here
}
\`\`\`

## Benefits

- **Faster perceived response**: Users see text immediately
- **Better UX**: Progress indication during generation
- **Reduced latency**: No waiting for complete response
`,
  },
  {
    id: 'context',
    title: 'Context Management',
    icon: Cpu,
    content: `# Context Management

Amkyaw AI maintains conversation context by sending the last 15 messages with each request.

## How It Works

1. All messages are stored in local state
2. Before each API call, recent messages are extracted
3. Messages are sent alongside the new user message
4. AI responds with context of previous conversation

## Configuration

You can adjust the context window in \`/api/chat/route.ts\`:

\`\`\`typescript
// Get last 15 messages for context
const recentMessages = messages.slice(-15);
\`\`\`

## Best Practices

- Keep conversations focused on single topics
- Use clear, specific questions for better context
- Start new chats for different topics
`,
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    icon: Shield,
    content: `# Security & Privacy

Your privacy and security are our top priorities.

## Data Handling

- **Local Storage**: Chat history is stored locally in your browser
- **No Persistence**: Conversations are not stored on servers
- **Encryption**: All API communications are encrypted

## Best Practices

1. Don't share sensitive personal information
2. Use secure connections (HTTPS)
3. Clear browser data regularly
4. Review chat history before sharing

## API Keys

If using custom Groq API keys:
- Never expose keys in client-side code
- Use environment variables
- Rotate keys periodically
`,
  },
];

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState(docSections[0].id);
  const [expandedSections, setExpandedSections] = useState<string[]>([docSections[0].id]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      <div className="pt-16 flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 h-[calc(100vh-64px)] fixed left-0 top-16 overflow-y-auto glass">
          <div className="p-4">
            <h2 className="font-['Outfit'] text-lg font-semibold text-white mb-4 px-2">
              Documentation
            </h2>
            <nav className="space-y-1">
              {docSections.map((section) => {
                const Icon = section.icon;
                const isExpanded = expandedSections.includes(section.id);
                
                return (
                  <div key={section.id}>
                    <button
                      onClick={() => {
                        toggleSection(section.id);
                        setActiveSection(section.id);
                        document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-[#00f2ff]/10 text-[#00f2ff]'
                          : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="flex-1 text-left text-sm font-medium">{section.title}</span>
                      {isExpanded ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                    </button>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-9 mt-1 space-y-1">
                            {/* Sub-items would go here */}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden fixed bottom-4 right-4 z-50 p-4 glass rounded-full"
        >
          <BookOpen size={24} />
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 bottom-0 w-72 glass"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <h2 className="font-['Outfit'] text-lg font-semibold text-white mb-4">
                  Documentation
                </h2>
                <nav className="space-y-1">
                  {docSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => {
                          setActiveSection(section.id);
                          setMobileMenuOpen(false);
                          document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          activeSection === section.id
                            ? 'bg-[#00f2ff]/10 text-[#00f2ff]'
                            : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon size={18} />
                        <span className="text-sm font-medium">{section.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </motion.div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 lg:ml-72 p-6 lg:p-8 max-w-4xl mx-auto">
          {docSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="mb-16 scroll-mt-20"
            >
              <div className="flex items-center gap-3 mb-4">
                <section.icon className="w-8 h-8 text-[#00f2ff]" />
                <h1 className="font-['Outfit'] text-3xl font-bold text-white">{section.title}</h1>
              </div>
              <div className="glass-card p-6 prose prose-invert max-w-none">
                <div
                  className="text-white/90 markdown-content"
                  dangerouslySetInnerHTML={{
                    __html: section.content
                      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mb-4">$1</h1>')
                      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold text-white mt-6 mb-3">$1</h2>')
                      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-medium text-white mt-4 mb-2">$1</h3>')
                      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
                      .replace(/\*(.+?)\*/g, '<em>$1</em>')
                      .replace(/`([^`]+)`/g, '<code class="bg-white/10 px-1.5 py-0.5 rounded text-sm text-[#00f2ff]">$1</code>')
                      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-[#1a1a2e] p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">$2</code></pre>')
                      .replace(/\n\n/g, '</p><p class="mb-4">')
                      .replace(/\n/g, '<br>'),
                  }}
                />
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}