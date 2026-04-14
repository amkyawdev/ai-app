import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Bot, User } from 'lucide-react';
import { formatTimeLabel } from '@/lib/utils';

export function ChatMessage({
  role,
  content,
  createdAt,
}: {
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}) {
  const isAssistant = role === 'assistant';

  return (
    <div className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      {isAssistant ? (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-cyan-20 bg-cyan-10 text-cyan">
          <Bot className="h-5 w-5" />
        </div>
      ) : null}
      <div className={`max-w-3xl rounded-[1.75rem] border px-5 py-4 shadow-glow ${
        isAssistant
          ? 'border-white-10 bg-white-10 text-slate-100'
          : 'border-violet-20 bg-violet-10 text-white'
      }`}>
        <div className="prose prose-invert prose-pre:overflow-x-auto prose-pre:rounded-2xl prose-pre:border prose-pre:border-white-10 prose-pre:bg-slate-950-90 prose-code:before:hidden prose-code:after:hidden max-w-none text-sm leading-7">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {content}
          </ReactMarkdown>
        </div>
        <p className="mt-3 text-xs text-slate-400">{formatTimeLabel(createdAt)}</p>
      </div>
      {!isAssistant ? (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white-10 bg-white-10 text-white">
          <User className="h-5 w-5" />
        </div>
      ) : null}
    </div>
  );
}
