import { DOC_SECTIONS } from '@/lib/constants';

function DocsSidebar() {
  return (
    <aside className="sticky top-24 hidden h-fit rounded-[2rem] border border-white-10 bg-white-5 p-5 shadow-glow backdrop-blur-xl lg:block">
      <p className="text-sm font-medium text-slate-400">Documentation</p>
      <div className="mt-4 space-y-5">
        {DOC_SECTIONS.map((section) => (
          <div key={section.id}>
            <a href={`#${section.id}`} className="text-sm font-semibold text-white">
              {section.label}
            </a>
            <div className="mt-2 space-y-2 border-l border-white-10 pl-4">
              {section.children.map((child) => (
                <a key={child.id} href={`#${child.id}`} className="block text-sm text-slate-400 transition hover:text-cyan">
                  {child.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 rounded-[2rem] border border-white-10 bg-white-5 p-6 shadow-glow backdrop-blur-xl sm:p-8">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">{children}</div>
    </section>
  );
}

export default function DocsPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
      <DocsSidebar />
      <div className="space-y-6">
        <Section id="quick-start" title="Quick Start">
          <div id="installation" className="scroll-mt-28">
            <p>Install dependencies with <code>npm install</code>, then run <code>npm run dev</code> to launch the app locally.</p>
          </div>
          <div id="environment" className="scroll-mt-28">
            <p>Add <code>GROQ_API_KEY</code> to your environment before calling the streaming route.</p>
          </div>
          <div id="streaming-flow" className="scroll-mt-28">
            <p>The client submits chat messages to <code>/api/chat</code>. The server forwards them to Groq with streaming enabled and sends token deltas back through a Web stream.</p>
          </div>
        </Section>

        <Section id="api-reference" title="API Reference">
          <div id="chat-endpoint" className="scroll-mt-28">
            <p><code>POST /api/chat</code> accepts a JSON payload with a <code>messages</code> array. Each item contains <code>role</code> and <code>content</code>.</p>
          </div>
          <div id="message-schema" className="scroll-mt-28">
            <pre className="overflow-x-auto rounded-2xl border border-white-10 bg-slate-950-90 p-4 text-xs text-slate-200"><code>{`{
  "messages": [
    { "role": "user", "content": "How fast is Llama 4 Scout?" }
  ]
}`}</code></pre>
          </div>
          <div id="rag-pipeline" className="scroll-mt-28">
            <p>The route performs simple local retrieval against a curated knowledge corpus, then injects the highest-scoring snippets into the system prompt to ground answers.</p>
          </div>
        </Section>

        <Section id="model-specs" title="Model Specs (Llama 4 Scout)">
          <div id="llama-4-scout" className="scroll-mt-28">
            <p>The app uses <code>meta-llama/llama-4-scout-17b-16e-instruct</code> as the default Groq model identifier.</p>
          </div>
          <div id="prompting" className="scroll-mt-28">
            <p>The assistant is guided by a stable system prompt emphasizing markdown clarity, concise answers, and grounded use of retrieved context.</p>
          </div>
          <div id="guardrails" className="scroll-mt-28">
            <p>Context trimming keeps prompt size controlled, while retrieval is limited to the most relevant passages to reduce noise and maintain answer quality.</p>
          </div>
        </Section>
      </div>
    </div>
  );
}
