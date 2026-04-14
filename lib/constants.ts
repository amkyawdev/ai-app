import type { LucideIcon } from 'lucide-react';
import { BookOpen, Bot, Layers3, Sparkles, Zap } from 'lucide-react';

export const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/chat', label: 'Chat' },
  { href: '/docs', label: 'Docs' },
  { href: '/about', label: 'About' },
];

export const VALUE_PROPS: Array<{ title: string; description: string; icon: LucideIcon }> = [
  {
    title: 'Token-Speed UX',
    description: 'Llama 4 Scout on Groq is tuned for ultra-fast response delivery, making live token streaming feel instantaneous.',
    icon: Zap,
  },
  {
    title: 'Context-Aware Answers',
    description: 'A lightweight context manager keeps recent turns and retrieved knowledge aligned for more consistent responses.',
    icon: Layers3,
  },
  {
    title: 'Readable AI Output',
    description: 'Markdown rendering, highlighted code blocks, and clear glassmorphism message bubbles improve clarity.',
    icon: Sparkles,
  },
];

export const DOC_SECTIONS = [
  {
    id: 'quick-start',
    label: 'Quick Start',
    children: [
      { id: 'installation', label: 'Installation' },
      { id: 'environment', label: 'Environment' },
      { id: 'streaming-flow', label: 'Streaming Flow' },
    ],
  },
  {
    id: 'api-reference',
    label: 'API Reference',
    children: [
      { id: 'chat-endpoint', label: 'POST /api/chat' },
      { id: 'message-schema', label: 'Message Schema' },
      { id: 'rag-pipeline', label: 'RAG Pipeline' },
    ],
  },
  {
    id: 'model-specs',
    label: 'Model Specs',
    children: [
      { id: 'llama-4-scout', label: 'Llama 4 Scout' },
      { id: 'prompting', label: 'Prompting Strategy' },
      { id: 'guardrails', label: 'Guardrails' },
    ],
  },
];

export const ABOUT_PILLARS = [
  {
    title: 'Speed as a Feature',
    description: 'Amkyaw AI is designed so that latency feels invisible, turning generation into a fluid product experience.',
    icon: Zap,
  },
  {
    title: 'Clarity in Interaction',
    description: 'Readable structure, concise prompts, and a well-managed context window keep answers useful and predictable.',
    icon: BookOpen,
  },
  {
    title: 'Human-Centered AI',
    description: 'The interface balances cinematic design with trust-building cues so users stay oriented during complex conversations.',
    icon: Bot,
  },
];
