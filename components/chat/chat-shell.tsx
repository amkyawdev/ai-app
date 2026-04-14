'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { Loader2, MessageSquarePlus, SendHorizonal } from 'lucide-react';
import { ChatMessage as MessageBubble } from '@/components/chat/chat-message';
import { cn } from '@/lib/utils';

type Role = 'user' | 'assistant';

interface Message {
  id: string;
  role: Role;
  content: string;
  createdAt: string;
}

interface Thread {
  id: string;
  title: string;
  updatedAt: string;
  messages: Message[];
}

const STORAGE_KEY = 'amkyaw-ai-threads';

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

function createThread(): Thread {
  return {
    id: makeId(),
    title: 'New conversation',
    updatedAt: new Date().toISOString(),
    messages: [
      {
        id: makeId(),
        role: 'assistant',
        content:
          'Welcome to **Amkyaw AI**. Ask about Groq, Llama 4 Scout, implementation details, or your own product workflow.',
        createdAt: new Date().toISOString(),
      },
    ],
  };
}

export function ChatShell() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string>('');
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const starter = createThread();
      setThreads([starter]);
      setActiveThreadId(starter.id);
      return;
    }

    const parsed = JSON.parse(raw) as Thread[];
    setThreads(parsed);
    setActiveThreadId(parsed[0]?.id ?? '');
  }, []);

  useEffect(() => {
    if (threads.length > 0) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
    }
  }, [threads]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [threads, activeThreadId]);

  const activeThread = useMemo(
    () => threads.find((thread) => thread.id === activeThreadId) ?? threads[0],
    [threads, activeThreadId],
  );

  const updateActiveThread = (updater: (thread: Thread) => Thread) => {
    setThreads((current) =>
      current.map((thread) => (thread.id === activeThreadId ? updater(thread) : thread)),
    );
  };

  const handleNewThread = () => {
    const thread = createThread();
    setThreads((current) => [thread, ...current]);
    setActiveThreadId(thread.id);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim() || !activeThread || isStreaming) return;

    const userMessage: Message = {
      id: makeId(),
      role: 'user',
      content: input.trim(),
      createdAt: new Date().toISOString(),
    };

    const assistantMessage: Message = {
      id: makeId(),
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
    };

    const pendingMessages = [...activeThread.messages, userMessage, assistantMessage];
    updateActiveThread((thread) => ({
      ...thread,
      title: thread.title === 'New conversation' ? userMessage.content.slice(0, 42) : thread.title,
      updatedAt: new Date().toISOString(),
      messages: pendingMessages,
    }));
    setInput('');
    setIsStreaming(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: pendingMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to start streaming response.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });

        updateActiveThread((thread) => ({
          ...thread,
          updatedAt: new Date().toISOString(),
          messages: thread.messages.map((message) =>
            message.id === assistantMessage.id
              ? { ...message, content: accumulated }
              : message,
          ),
        }));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Streaming failed.';
      updateActiveThread((thread) => ({
        ...thread,
        messages: thread.messages.map((item) =>
          item.id === assistantMessage.id
            ? {
                ...item,
                content: `⚠️ ${message}\n\nMake sure your **GROQ_API_KEY** is set and the Groq model is available.`,
              }
            : item,
        ),
      }));
    } finally {
      setIsStreaming(false);
    }
  }

  if (!activeThread) {
    return null;
  }

  return (
    <div className="grid min-h-[calc(100vh-7rem)] gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="rounded-[2rem] border border-white-10 bg-white-5 p-4 shadow-glow backdrop-blur-xl">
        <button
          type="button"
          onClick={handleNewThread}
          className="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-cyan/20"
        >
          <MessageSquarePlus className="h-4 w-4" />
          New chat
        </button>
        <div className="space-y-2">
          {threads.map((thread) => (
            <button
              key={thread.id}
              type="button"
              onClick={() => setActiveThreadId(thread.id)}
              className={cn(
                'w-full rounded-2xl border px-4 py-3 text-left transition',
                thread.id === activeThreadId
                  ? 'border-cyan/30 bg-white-10 text-white'
                  : 'border-white-10 bg-white-5 text-slate-300 hover:bg-white-10',
              )}
            >
              <p className="truncate text-sm font-medium">{thread.title}</p>
              <p className="mt-1 truncate text-xs text-slate-400">
                {thread.messages[thread.messages.length - 1]?.content || 'No messages yet'}
              </p>
            </button>
          ))}
        </div>
      </aside>

      <section className="flex min-h-[70vh] flex-col rounded-[2rem] border border-white-10 bg-white-5 shadow-glow backdrop-blur-xl">
        <div className="border-b border-white-10 px-6 py-5">
          <p className="text-sm text-slate-400">Realtime token streaming</p>
          <h1 className="text-2xl font-semibold text-white">Chat with Amkyaw AI</h1>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
          {activeThread.messages.map((message) => (
            <MessageBubble
              key={message.id}
              role={message.role}
              content={message.content || (message.role === 'assistant' ? '...' : '')}
              createdAt={message.createdAt}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="border-t border-white-10 p-4 sm:p-6">
          <div className="flex flex-col gap-3 rounded-[1.75rem] border border-white-10 bg-slate-950-70 p-3 shadow-inner shadow-black/20 sm:flex-row sm:items-end">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={3}
              placeholder="Ask about Groq integration, docs, or your own use case..."
              className="min-h-[92px] flex-1 resize-none bg-transparent px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={isStreaming}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-cyan/30 bg-cyan/10 px-5 text-sm font-medium text-white transition hover:bg-cyan/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isStreaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
              {isStreaming ? 'Streaming...' : 'Send'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
