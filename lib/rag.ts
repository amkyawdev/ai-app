const corpus = [
  {
    id: 'quick-start-installation',
    title: 'Quick Start Installation',
    content:
      'Install dependencies with npm install, set GROQ_API_KEY in environment variables, and start the app with npm run dev. The app is built with Next.js 14 App Router, Tailwind CSS, and Framer Motion.',
  },
  {
    id: 'streaming-architecture',
    title: 'Streaming Architecture',
    content:
      'The /api/chat route uses groq-sdk chat completions with stream enabled. The route forwards token deltas through a Web ReadableStream so the client can render each chunk progressively.',
  },
  {
    id: 'context-management',
    title: 'Context Management',
    content:
      'Context management trims message history to recent exchanges and preserves a strong system prompt. This reduces prompt bloat while keeping conversation relevance high.',
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    content:
      'Prompt engineering combines a stable system instruction set, retrieved notes from the local knowledge corpus, and the latest user turns to produce grounded answers.',
  },
  {
    id: 'llama-4-scout-specs',
    title: 'Llama 4 Scout Model Specs',
    content:
      'On Groq, the exact model identifier is meta-llama/llama-4-scout-17b-16e-instruct. Groq lists a 131072 token context window and fast token throughput suitable for live chat experiences.',
  },
];

function score(text: string, query: string) {
  const queryTerms = query
    .toLowerCase()
    .split(/\W+/)
    .filter(Boolean);

  return queryTerms.reduce((acc, term) => {
    if (text.toLowerCase().includes(term)) {
      return acc + 1;
    }
    return acc;
  }, 0);
}

export function retrieveRelevantContext(query: string) {
  const ranked = corpus
    .map((item) => ({
      ...item,
      score: score(`${item.title} ${item.content}`, query),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return ranked
    .map((item) => `- ${item.title}: ${item.content}`)
    .join('\n');
}
