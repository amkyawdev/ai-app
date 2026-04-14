import Link from 'next/link';

const docSections = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', href: '#introduction' },
      { label: 'Quick Start', href: '#quick-start' },
      { label: 'API Reference', href: '#api' },
    ],
  },
  {
    title: 'Features',
    items: [
      { label: 'Token Streaming', href: '#streaming' },
      { label: 'Context Memory', href: '#memory' },
      { label: 'Markdown Support', href: '#markdown' },
    ],
  },
  {
    title: 'Integration',
    items: [
      { label: 'Groq Setup', href: '#setup' },
      { label: 'Environment Variables', href: '#env' },
      { label: 'Deployment', href: '#deploy' },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="flex min-h-screen pt-20">
      {/* Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 border-r border-white/10">
        <div className="sticky top-24 p-6">
          <h2 className="mb-6 text-lg font-semibold text-white">Documentation</h2>
          
          {docSections.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="mb-3 text-sm font-medium text-zinc-400">{section.title}</h3>
              <nav className="space-y-1">
                {section.items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block py-2 text-sm text-zinc-500 hover:text-cyan transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12">
        <div className="mx-auto max-w-3xl">
          {/* Introduction */}
          <section id="introduction" className="mb-16 scroll-mt-24">
            <h1 className="mb-4 text-3xl font-bold text-white">Introduction</h1>
            <p className="text-zinc-400">
              Amkyaw AI is a next-generation AI assistant built with Next.js 14, 
              Groq SDK, and modern design principles. It features ultra-fast token 
              streaming, context-aware conversations, and a beautiful glassmorphism UI.
            </p>
          </section>

          {/* Quick Start */}
          <section id="quick-start" className="mb-16 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-white">Quick Start</h2>
            <div className="glass-card p-6">
              <pre className="text-sm text-zinc-300 overflow-x-auto">
{`# Clone the repository
git clone https://github.com/amkyawdev/ai-app.git

# Install dependencies
npm install

# Set environment variable
echo "GROQ_API_KEY=your_api_key" > .env.local

# Run development server
npm run dev`}
              </pre>
            </div>
          </section>

          {/* Token Streaming */}
          <section id="streaming" className="mb-16 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-white">Token Streaming</h2>
            <p className="text-zinc-400 mb-4">
              Amkyaw AI uses ReadableStream to stream tokens in real-time, 
              providing an instant feedback experience.
            </p>
            <div className="glass-card p-6">
              <pre className="text-sm text-zinc-300 overflow-x-auto">
{`const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ messages }),
});

const reader = response.body.getReader();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  const chunk = decoder.decode(value);
  // Process chunk in real-time
}`}
              </pre>
            </div>
          </section>

          {/* API Reference */}
          <section id="api" className="mb-16 scroll-mt-24">
            <h2 className="mb-4 text-2xl font-bold text-white">API Reference</h2>
            <div className="space-y-4">
              <div className="glass-card p-6">
                <h3 className="mb-2 font-semibold text-white">POST /api/chat</h3>
                <p className="text-sm text-zinc-400">Send a message and receive AI response.</p>
                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-medium text-zinc-300">Request Body</h4>
                  <pre className="text-sm text-zinc-400">{`{
  messages: [
    { role: 'user', content: 'Hello!' }
  ]
}`}</pre>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
